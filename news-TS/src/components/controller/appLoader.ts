import Loader from './loader';

class AppLoader<T> extends Loader<T> {
    constructor() {
        super(process.env.API_URL as string, {
            apiKey: process.env.API_KEY as string,
        });
    }
}

export default AppLoader;
