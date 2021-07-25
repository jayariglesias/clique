/*

LIST OF FUNCTIONS
    ** -> Function Name
        > fd.functionName <-- calling function
    -- -> Return || Description

    ** append(id,value)
    -- append a value to the id of tags

    ** plusAppend(id,value)
    -- append a value to the id of tags continuously

    ** checkValue(id.value)
    -- return null if null
    -- return value if not null

    ** checkBool(id.value)
    -- return false if null 
    -- return true if not null

    ** checkObject({obj1:value,obj2:value})
    -- return false if 1 object has null
    -- return true if all object has value

    ** setLocal(desiredname,value)
    ** setSession(desiredname,value)
    ** getLocal(nameinserted)
    ** getSession(nameinserted)
    -- return true if success
    -- return true if not success 

    ** setCookie(desiredname,value,hourexpiry)
    -- Ex. setCookie('token','tok_080397', 24)
    ** getCookie(nameinserted)

    ** formatDate(datetime from MySQL)
    -- return 2020-08-03 YYYY-MM-DD 

    ** previewImage(this,idofimgsrc)
    -- put this function in onchange on input file type 
    -- Ex. <input type="file" onchange="previewImage(this,'idofimgsrc') />"

    ** onMousempve(containerid,imgyouwanttomoveid)
    -- allow to move image when mouse is moving

    ** toggle(idofcontainertohide, classnametoremove)
    -- allow to remove/add classname

*/

const fd = {
    append: (e, t) => {
        document.getElementById(e).innerHTML = t
    },
    plusAppend: (e, t) => {
        document.getElementById(e).innerHTML += t
    },
    checkValue: e =>
        "" == e || null == e || 0 == e.trim().length ? null : e,
    checkBool:
        e => "" != e && null != e && 0 != e.trim().length,
    checkObject:
        e => !Object.values(e).some(e => !clique.checkBool(e)),
    setLocal: (e, t) => (
        localStorage.setItem(e, JSON.stringify(t)), !!clique.checkBool(localStorage.getItem(e))),
    setSession: () => (
        sessionStorage.setItem(x, JSON.stringify(y)), !!clique.checkBool(sessionStorage.getItem(x))),
    getLocal:
        e => clique.checkBool(localStorage.getItem(e)) ? localStorage.getItem(JSON.parse(e)) : null,
    getSession:
        e => !!clique.checkBool(sessionStorage.getItem(e)) && sessionStorage.getItem(JSON.parse(e)),
    setCookie: (e, t, l) => {
        let o = new Date;
        o.setTime(o.getTime() + 1 * l * 60 * 60 * 1e3);
        let n = `expires=${e.toUTCString()}`;
        document.cookie = `${e}=${t};${n};path=/`
    },
    getCookie: e => {
        let t = `${data}=`,
            l = decodeURIComponent(document.cookie).split(";");
        for (let e = 0; e < l.length; e += 1) {
            let o = l[e];
            for (;
                " " === o.charAt(0);) o = o.substring(1);
            if (0 === o.indexOf(t)) return o.substring(t.length, o.length)
        }
        return ""
    },
    deleteAllCookies: () => {
        let e = document.cookie.split(";");
        for (let t = 0; t < e.length; t++) {
            let l = e[t],
                o = l.indexOf("="),
                n = o > -1 ? l.substr(0, o) : l;
            document.cookie = `${n}=;expires=Thu, 03 Aug 1997 00:00:00 GMT`
        }
    },
    formatDate: () => {
        let e = new Date(date),
            t = "" + (e.getMonth() + 1),
            l = "" + e.getDate(),
            o = e.getFullYear();
        return t.length < 2 && (t = "0" + t), l.length < 2 && (l = "0" + l), [o, t, l].join("-")
    },
    previewImage: (e, t) => {
        let l = e.files;
        if (l.length > 0) {
            let e = new FileReader;
            e.onload = function (e) {
                document.getElementById(t).setAttribute("src", e.target.result)
            };
            e.readAsDataURL(l[0])
        }
    },
    onMousemove: (x, y) => {
        let id = document.getElementById(x);
        let img = document.getElementById(y);

        id.style.perspective = '40px';
        id.onmouseenter = (e) => { update(e) };
        id.onmouseleave = (e) => { img.style = '' };
        id.onmousemove = (e) => { update(e) };

        let pos = { x1: 0, y1: 0, x2: 0, y2: 0 };

        const updatePos = (e) => {
            pos.x1 = e.clientX - pos.x2;
            pos.y1 = (e.clientY - pos.y2) * -1;
        }

        const setPos = (e) => {
            pos.x2 = e.offsetLeft + Math.floor(e.offsetWidth / 2);
            pos.y2 = e.offsetTop + Math.floor(e.offsetHeight / 2);
        }

        const update = (e) => {
            updatePos(e);
            let x = (pos.y1 / img.offsetHeight / .5).toFixed(2);
            let y = (pos.x1 / img.offsetWidth / .5).toFixed(2);
            let z = `rotateX(${x}deg) rotateY(${y}deg)`;
            img.style.transform = z;
            img.style.webkitTransform = z;
        };

        setPos(id);
    },
    toggle: (x, y) => {
        let id = document.getElementById(x);

        if (id.className.includes(y)) {
            id.classList.remove(y);
        } else {
            id.classList.add(y);
        }
    }
};
