import data from './data';

// tslint:disable-next-line:no-any arrow-return-shorthand
export default (config: any) => {
    return {
        ...config,
        devServer: {
            ...config.devServer,
            // tslint:disable-next-line:no-any
            after: data,
        },
    };
};
