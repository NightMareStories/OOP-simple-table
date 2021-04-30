class GridView {
    /**
     *  properties
     *  @param [array] _tableClass - css классы оформления
     *  @param [array] data  - выходные данные
     *  @param [array] attribute - управляем что выводим 
     *  @param [array] _element  - куда выводить таблицу
     *  @param [array] _header  - заголовок таблицы
     *  @param [array] _headerClass  - css классы заголовка
     */

    constructor() {
        this._header = '';
        this._headerClass = [];
        this._tableClass = [];
        this._element = 'body';
        this.attribute = [];
    }

    /**
    *  Method set header
    */

    setHeader(header) {
        if (typeof header === 'string' && header.trim() != '') {
            this._header = header.trim();
            return true;
        }
        return false;
    }

    /**
    *  Method set header
    */

    setHeaderClass(headerClass) {
        if (Array.isArray(headerClass)) {
            this._headerClass = headerClass;
            return true;
        }
        return false;
    }

    /**
    *  Method set element
    */

    setElement(element) {
        if (document.querySelector(element)) {
            this._element = element;
            return true;
        }
        return false;
    }


    /**
     *  Method for show GridViewTable
     */

    render(data) {
        this.setElement(data.element);
        this.setHeaderClass(data.headerClass);
        this.attribute = data.attribute;
        this.setHeader(data.header);
        this.data = data.data;
        // show header
        if (this._header) {
            const header = document.createElement('h1');
            header.textContent = this._header;
            this._headerClass.forEach(cssClass => {
                header.classList.add(cssClass);
            });
            document.querySelector(this._element).append(header);
        }
        // show table
        const table = document.createElement('table');
        this._tableClass.forEach(cssClass => {
            table.classList.add(cssClass);
        });
        // create table header
        let trHeader = document.createElement('tr');
        for (let key in this.attribute) {
            let th = document.createElement('th');
            if (this.attribute[key].label) {
                th.textContent = this.attribute[key].label;
            }
            else {
                th.textContent = key;
            }
            trHeader.append(th);
        }
        table.append(trHeader);
        // draw table
        for (let i = 0; i < this.data.length; i++) {

            let dataArr = this.data[i]; // одна строка данных или объект массива dataExample

            let tr = document.createElement('tr');
            for (let key in this.attribute) {
                let td = document.createElement('td');

                let value = dataArr[key];// value - это элемент объекта в массиве dataExample

                if (this.attribute[key].value) { // есть ли функция value в ключе attribute объекта data
                    value = this.attribute[key].value(dataArr); // если есть, то переменной value присваивается значение ключа value в объекте attribute, а к значению применяется функция value, с параметром dataArr, в котором находится объект данных, вложенный в массив dataExample  
                }

                if (this.attribute[key].src) { // наличие атрибута src, если он есть то выводить теги HTML
                    td.innerHTML = value;
                }
                else {
                    td.textContent = value;
                }
                tr.append(td);
            }
            table.append(tr);
        }

        document.querySelector(this._element).append(table);
    }
}