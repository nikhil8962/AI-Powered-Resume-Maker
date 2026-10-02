import { Routes } from '@angular/router';
import { Root } from './root/root';
import { Home } from './home/home';
import { Resume } from './resume/resume';
import { About } from './toolBar-Component/about/about';
import { ServicesPage } from './toolBar-Component/services/services';
import { Contact } from './toolBar-Component/contact/contact';
import { Auth } from './toolBar-Component/auth/auth';




export const routes: Routes = [
    {
        path: '', component: Root, children: [
            { path: '', component: Home },
            {path:'about',component:About},
            { path: 'generate-resume', component: Resume},
            { path: 'services', component: ServicesPage},
            { path: 'contact', component: Contact},
            { path: 'login', component: Auth}

        ]
    }
];
