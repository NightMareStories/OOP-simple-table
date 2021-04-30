const dataExample = [
    {
        company: 'Alfreds <b>Futterkiste</b>',
        chef: 'Maria Anders',
        country: 'Germany'
    },
    {
        company: 'Centro comercial Moctezuma',
        chef: 'Francisco Chang',
        country: 'Mexico'
    },
    {
        company: 'Ernst Handel',
        chef: 'Roland Mendel',
        country: 'Austria',
    },
    {
        company: 'Island Trading',
        chef: 'Helen Bennett',
        country: 'UK'
    },
    {
        company: 'Laughing Bacchus Winecellars',
        chef: 'Yoshi Tannamuri',
        country: 'Canada',
    }
];

let gridView = new GridView();
const data = {
    header: 'Лёгкая таблица компаний, сделанная на ООП в JS',
    element: 'div',
    headerClass: ['header', 'site-header'],
    attribute: {
        'company': {
            'label': 'Компания',
            'src': 'html',
        },
        'chef': {
            'label': 'Директор',
        },
        'country': {
            'label': 'Страна',

            'value': (data) => {
                //Данная функция заменяет текст ячейки таблицы country добавляя map, в качестве параметра data выступает вложенные объекты массива dataExample

                if (data['country'] === 'Germany') {
                    return data['country'] + ' map'
                }
                return data['country'];
            }
        }
    },
    data: dataExample
}

gridView.render(data);
console.log(gridView);