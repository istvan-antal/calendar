import data from './data';

// tslint:disable-next-line:no-any arrow-return-shorthand
export default (config: any) => {
    return {
        ...config,
        devServer: {
            ...config.devServer,
            proxy: {
                '/ws': 'http://localhost:3001',
            },
            // tslint:disable-next-line:no-any
            after: data,
        },
    };
};