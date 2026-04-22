import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from "@angular/common/http";
import { isPlatformBrowser } from "@angular/common";
import { inject, Inject, PLATFORM_ID } from "@angular/core";

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const platformId = inject(PLATFORM_ID)
    
    let token: string | null = null;

    if (isPlatformBrowser(platformId)) {
        token = localStorage.getItem("access_token");
        }
        
        if (token) {
            req = req.clone({
                setHeaders:{
                    Authorization:`Bearer ${token}`
                }
            });
        }
    
    return next(req);
};
  