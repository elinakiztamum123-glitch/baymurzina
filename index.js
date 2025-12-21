if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

function init() {
    const data = {
        name: 'Каталог товаров',
        hasChildren: true,
        items: [
            {
                name: 'Мойки',
                hasChildren: true,
                items: [
                    {
                        name: 'Ulgran',
                        hasChildren: true,
                        items: [
                            { name: 'Smth', hasChildren: false, items: [] },
                            { name: 'Smth', hasChildren: false, items: [] }
                        ]
                    },
                    {
                        name: 'Vigro Mramor',
                        hasChildren: false,
                        items: []
                    },
                    {
                        name: 'Handmade',
                        hasChildren: true,
                        items: [
                            { name: 'Smth', hasChildren: false, items: [] },
                            { name: 'Smth', hasChildren: false, items: [] }
                        ]
                    },
                    {
                        name: 'Vigro Glass',
                        hasChildren: false,
                        items: []
                    }
                ]
            },
            {
                name: 'Фильтры',
                hasChildren: true,
                items: [
                    {
                        name: 'Ulgran',
                        hasChildren: true,
                        items: [
                            { name: 'Smth', hasChildren: false, items: [] },
                            { name: 'Smth', hasChildren: false, items: [] }
                        ]
                    },
                    {
                        name: 'Vigro Mramor',
                        hasChildren: false,
                        items: []
                    }
                ]
            }
        ]
    };

    const items = new ListItems(document.getElementById('list-items'), data);

    items.render();
    items.init();

    function ListItems(el, data) {
        this.el = el;
        this.data = data;
        this.init = function () {
            this.el.addEventListener('click', (e) => {
                const arrow = e.target.closest('[data-open]');
                if (!arrow) return;

                const parent = arrow.closest('[data-parent]');
                if (parent) this.toggleItems(parent);
            });
        };

        this.render = function () {
            this.el.innerHTML = '';
            this.el.insertAdjacentHTML('beforeend', this.renderParent(this.data, true));
        };

        this.renderParent = function (data, isRoot = false) {
            const childrenHtml = data.items
                .map(item => item.hasChildren
                    ? this.renderParent(item)
                    : this.renderChildren(item)
                )
                .join('');

            const openClass = isRoot ? ' list-item_open' : '';

            return `
                <div class="list-item${openClass}" data-parent>
                    <div class="list-item__inner">
                        <img class="list-item__arrow" src="img/chevron-down.jpg" alt="chevron-down" data-open>
                        <img class="list-item__folder" src="img/folder.jpg" alt="folder">
                        <span>${data.name}</span>
                    </div>
                    <div class="list-item__items">
                        ${childrenHtml}
                    </div>
                </div>
            `;
        };

        this.renderChildren = function (data) {
            return `
                <div class="list-item">
                    <div class="list-item__inner">
                        <img class="list-item__folder" src="img/folder.jpg" alt="folder">
                        <span>${data.name}</span>
                    </div>
                </div>
            `;
        };

        this.toggleItems = function (parent) {
            parent.classList.toggle('list-item_open');
        };
    }
}
