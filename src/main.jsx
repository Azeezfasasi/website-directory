import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ProfileProvider } from './assets/contextAPI/ProfileContext.jsx'
import { TenantProvider } from './assets/contextAPI/TenantContext.jsx'
import { TenantAppProvider } from './assets/contextAPI/AppContext.jsx'
import { TenantCategoryProvider } from './assets/contextAPI/TenantCategoryContext.jsx'

createRoot(document.getElementById('root')).render(
    <ProfileProvider>
        <TenantProvider>
            <TenantAppProvider>
                <TenantCategoryProvider>
                    <App />
                </TenantCategoryProvider>
            </TenantAppProvider>
        </TenantProvider>
    </ProfileProvider>
)
