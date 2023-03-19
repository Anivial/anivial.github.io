import { FRACTAL_PATH, HOME_PATH, MUSIC_PATH, SNAKE_PATH, VERLET_QUICK_PATH, VERLET_RANDOM_PATH, } from './routePaths';

export type routesType = {
    title: string;
    link: string;
    routes?: Array<routesType>;
};

const routes: routesType = {
    title: 'anivial.github.io',
    link: HOME_PATH,
    routes: [
        {
            title: 'SNAKE',
            link: SNAKE_PATH,
        },
        {
            title: 'FRACTAL',
            link: FRACTAL_PATH,
        },
        {
            title: 'VERLET',
            link: '',
            routes: [
                {
                    title: 'RANDOM MULTICOLOR',
                    link: VERLET_RANDOM_PATH,
                },
                {
                    title: 'QUICK',
                    link: VERLET_QUICK_PATH,
                },
            ],
        },
        {
            title: 'MUSIC',
            link: MUSIC_PATH,
        },
    ],
};

export default routes;