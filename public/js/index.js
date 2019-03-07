(function () {
    
    window.onload = () => {

        const router = new Router(document.body);
        router.addRoute('/', wrapConstructorToFactory(IndexRoute));
        router.addRoute('/leaderboard', wrapConstructorToFactory(LeaderboardRoute));
        router.addRoute('/about', wrapConstructorToFactory(AboutRoute));
        router.setDefaultRoute('/');

        router.init();
        initAnchorsRouting(document.body, router);

    };
    
})();
