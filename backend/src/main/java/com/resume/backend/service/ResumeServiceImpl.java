//package com.resume.backend.service;
//
//import org.json.JSONObject;
//import org.springframework.ai.chat.client.ChatClient;
//import org.springframework.ai.chat.prompt.Prompt;
//import org.springframework.core.io.ClassPathResource;
//import org.springframework.stereotype.Service;
//
//import java.io.IOException;
//import java.nio.file.Files;
//import java.nio.file.Path;
//import java.util.HashMap;
//import java.util.Map;
//
//@Service
//public class ResumeServiceImpl implements ResumeService{
//
//    private ChatClient chatClient;
//
//    public ResumeServiceImpl(ChatClient.Builder builder){
//        this.chatClient = builder.build();
//    }
//    @Override
//    public Map<String, Object> generateResumeResponse(String userResumeDescription) throws IOException {
//
//        String promptString = this.loadPromptFromFile("resume_prompt.txt");
//        String promptContent = this.putValuesToTemplate(promptString, Map.of(
//                "userDescription",userResumeDescription
//        ));
//
//        Prompt prompt = new Prompt(promptContent);
//        String response = chatClient.prompt(prompt).call().content();
//
//        Map<String, Object> stringObjectMap = parseMultipleResponses(response);
//        return stringObjectMap;
//    }
//
//    String loadPromptFromFile(String filename) throws IOException{
//        Path path= new ClassPathResource(filename).getFile().toPath();
//        return Files.readString(path);
//    }
//
//    String putValuesToTemplate(String template, Map<String,String> values){
//        for (Map.Entry<String,String> entry: values.entrySet()){
//           template = template.replace("{{" + entry.getKey() + "}}", entry.getValue());
//        }
//        return template;
//    }
//
//    public static Map<String, Object> parseMultipleResponses(String response) {
//
//        Map<String, Object> result = new HashMap<>();
//
//        // Extract content inside <think> tags
//        int thinkStartIndex = response.indexOf("<think>");
//        int thinkEndIndex = response.indexOf("</think>");
//
//        if (thinkStartIndex != -1 && thinkEndIndex != -1) {
//            int thinkStart = thinkStartIndex + 7; // length of "<think>"
//            String thinkContent = response.substring(thinkStart, thinkEndIndex).trim();
//            result.put("think", thinkContent);
//        } else {
//            result.put("think", null); // Handle missing <think> tags
//        }
//
//        // Extract content inside ```json ```
//        int jsonStartIndex = response.indexOf("```json");
//        int jsonEndIndex = response.lastIndexOf("```");
//
//        if (jsonStartIndex != -1 && jsonEndIndex != -1 && jsonStartIndex < jsonEndIndex) {
//            int jsonStart = jsonStartIndex + 7; // length of "```json"
//            String jsonContent = response.substring(jsonStart, jsonEndIndex).trim();
//
//            try {
//                JSONObject dataContent = new JSONObject(jsonContent);
//                result.put("data", dataContent.toMap()); // Convert JSONObject to Map
//            } catch (Exception e) {
//                result.put("data", null); // Handle invalid JSON
//                System.err.println("Invalid JSON format in the response: " + e.getMessage());
//            }
//        } else {
//            result.put("data", null); // Handle missing JSON block
//        }
//        return result;
//    }
//}

// ---------------- service file given by claude. -----------------
package com.resume.backend.service;

import org.json.JSONObject;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@Service
public class ResumeServiceImpl implements ResumeService{

    private ChatClient chatClient;

    public ResumeServiceImpl(ChatClient.Builder builder){
        this.chatClient = builder.build();
    }
    @Override
    public Map<String, Object> generateResumeResponse(String userResumeDescription) throws IOException {

        String promptString = this.loadPromptFromFile("resume_prompt.txt");
        String promptContent = this.putValuesToTemplate(promptString, Map.of(
                "userDescription",userResumeDescription
        ));

        Prompt prompt = new Prompt(promptContent);
        String response = chatClient.prompt(prompt).call().content();

        Map<String, Object> stringObjectMap = parseMultipleResponses(response);
        return stringObjectMap;
    }

    String loadPromptFromFile(String filename) throws IOException{
        // Reads via the classpath stream instead of File — getFile() throws
        // once this runs from a packaged jar (e.g. on Render), since the
        // resource isn't a real filesystem path inside a jar.
        try (InputStream is = new ClassPathResource(filename).getInputStream()) {
            return new String(is.readAllBytes(), StandardCharsets.UTF_8);
        }
    }

    String putValuesToTemplate(String template, Map<String,String> values){
        for (Map.Entry<String,String> entry: values.entrySet()){
            template = template.replace("{{" + entry.getKey() + "}}", entry.getValue());
        }
        return template;
    }

    public static Map<String, Object> parseMultipleResponses(String response) {

        Map<String, Object> result = new HashMap<>();

        // Extract <think> content, then strip it out of what we search next —
        // a reasoning model's "thinking out loud" can itself contain example
        // ```json snippets, which must never be mistaken for the real answer.
        int thinkStartIndex = response.indexOf("<think>");
        int thinkEndIndex = response.indexOf("</think>");

        String remaining = response;

        if (thinkStartIndex != -1 && thinkEndIndex != -1) {
            int thinkStart = thinkStartIndex + "<think>".length();
            String thinkContent = response.substring(thinkStart, thinkEndIndex).trim();
            result.put("think", thinkContent);
            remaining = response.substring(thinkEndIndex + "</think>".length());
        } else {
            result.put("think", null);
        }

        // Prefer a fenced block if the model added one (```json or plain ```),
        // but fall back to the outermost { ... } in the raw text otherwise —
        // this is what makes it work whether or not the model uses fences.
        String jsonContent = extractFencedBlock(remaining);
        if (jsonContent == null) {
            jsonContent = extractOutermostJsonObject(remaining);
        }

        if (jsonContent == null) {
            result.put("data", null);
            System.err.println("No JSON object could be located in the AI response.");
            return result;
        }

        try {
            JSONObject dataContent = new JSONObject(jsonContent);
            result.put("data", dataContent.toMap());
        } catch (Exception e) {
            result.put("data", null);
            System.err.println("Invalid JSON format in the response: " + e.getMessage());
        }

        return result;
    }

    private static String extractFencedBlock(String text) {
        int start = text.indexOf("```json");
        int fenceLength = 7;
        if (start == -1) {
            start = text.indexOf("```");
            fenceLength = 3;
        }
        if (start == -1) return null;

        int contentStart = start + fenceLength;
        int end = text.indexOf("```", contentStart);
        if (end == -1) return null;

        return text.substring(contentStart, end).trim();
    }

    private static String extractOutermostJsonObject(String text) {
        int start = text.indexOf('{');
        int end = text.lastIndexOf('}');
        if (start == -1 || end == -1 || start > end) return null;
        return text.substring(start, end + 1).trim();
    }
}