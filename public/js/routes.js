(function () {

    class IndexRoute {
        constructor(rootEl, router) {
            if (!(rootEl instanceof Node)) {
                throw TypeError('rootEl must be Node');
            }
            if (!(router instanceof Router)) {
                throw TypeError('router must be Router');
            }

            this._rootEl = rootEl;
            this._router = router;
        }

        init() {
            this._rootEl.innerHTML = Handlebars.templates['index.html']({username: stubData.username});
        }

        deinit() {
            this._rootEl.innerHTML = '';
        }
    };

    class LeaderboardRoute {
        constructor(rootEl, router) {
            if (!(rootEl instanceof Node)) {
                throw TypeError('rootEl must be Node');
            }
            if (!(router instanceof Router)) {
                throw TypeError('router must be Router');
            }

            this._rootEl = rootEl;
            this._router = router;

            this._entries = stubData.leaderboard;
            this._maxEntriesOnPage = 4;
            this._currentPage = 0;

            this._handleBackButtonClick = this._handleBackButtonClick.bind(this);
            this._handleNextButtonClick = this._handleNextButtonClick.bind(this);
        }

        init() {
            this._render();
            this._rootEl.addEventListener('click', this._handleBackButtonClick);
            this._rootEl.addEventListener('click', this._handleNextButtonClick);
        }

        deinit() {
            this._rootEl.innerHTML = '';
            this._rootEl.removeEventListener('click', this._handleBackButtonClick);
            this._rootEl.removeEventListener('click', this._handleNextButtonClick);
        }

        _render() {
            const ctx = {
                people: this._getEntriesOnCurrentPage(),
                pageNum: this._currentPage + 1,
                pagesCount: Math.ceil(this._entries.length / this._maxEntriesOnPage),
            };
            this._rootEl.innerHTML = Handlebars.templates['leaderboard.html'](ctx);
        }

        _getEntriesOnCurrentPage() {
            return this._entries.slice(this._currentPage * this._maxEntriesOnPage, (this._currentPage + 1) * this._maxEntriesOnPage);
        }

        _handleBackButtonClick(ev) {
            if (!ev.target.classList.contains('leaderboard__back-btn')) {
                return;
            }
            const canGo = this._goBackPage();
            if (!canGo) {
                return;
            }
            this._render();
        }

        _handleNextButtonClick(ev) {
            if (!ev.target.classList.contains('leaderboard__next-btn')) {
                return;
            }
            const canGo = this._goNextPage();
            if (!canGo) {
                return;
            }
            this._render();
        }

        _goBackPage() {
            if (this._currentPage === 0) {
                return false;
            }
            this._currentPage--;
            return true;
        }

        _goNextPage() {
            if (((this._currentPage + 1) * this._maxEntriesOnPage) >= this._entries.length) {
                return false;
            }
            this._currentPage++;
            return true;
        }
    };

    class AboutRoute {
        constructor(rootEl, router) {
            if (!(rootEl instanceof Node)) {
                throw TypeError('rootEl must be Node');
            }
            if (!(router instanceof Router)) {
                throw TypeError('router must be Router');
            }

            this._rootEl = rootEl;
            this._router = router;
        }

        init() {
            this._rootEl.innerHTML = Handlebars.templates['about.html']();
        }

        deinit() {
            this._rootEl.innerHTML = '';
        }
    };
    
    window.IndexRoute = IndexRoute;
    window.LeaderboardRoute = LeaderboardRoute;
    window.AboutRoute = AboutRoute;

})();
