import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
export type MiddlewareDefinition = (req: any, res: any, next: (err?: any) => void) => void;


export function convertToGlobalMiddleware(middleware: MiddlewareDefinition, priority: number) {
    @Middleware({ type: 'before', priority })
    class MidlwareWrapper implements ExpressMiddlewareInterface {

        use(request: any, response: any, next: (err?: any) => void) {
            middleware(request, response, next);
        }
    }

    return MidlwareWrapper;
}