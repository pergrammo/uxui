
//
// HealthverseObj API
//

const HealthverseObj = (() => {

    // =============================
    // Public methods and properties
    // =============================
    let hvobj = {}

    // server link fn.
    hvobj.get_server = (url) => {
        let qurl = "http://localhost:8444/";
        try {
            if (!url) {
                throw "Not found url."
            }
            qurl += url
        } catch (err) {
            qurl = err
        }
        
        return qurl;
    }

    // get query string fn.
    hvobj.get_qstring = (urls, str) => {
        
        // let url = new URL("https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8&q=mdn%20query%20string");
        // window.location.href

        let qstr
        if (str) {
            let url = new URL(urls)
            try {
                if (!url.search) {
                    throw "Not found qString."
                }
                let params = new URLSearchParams(url.search)
                qstr = params.get(str)
            } catch (err) {
                qstr = err
            }
        } else {
            qstr = "Not found qVar."
        }

        return qstr
    }

    // redirect fn.
    hvobj.redirect = (url, speed) => {
        setTimeout(() => window.open(url, "_self"), speed)
    }

    // redirectblank fn.
    hvobj.redirectblank = (url, speed) => {
        setTimeout(() => window.open(url, "_blank"), speed)
    }

    // notify fn.
    hvobj.notify_loading = function (msg) {
        // add message
        $("#notify").empty();
        $("#notify").append(msg);

        // show/hide message
        $("#notify").addClass("show");
        setTimeout(function () {
            $("#notify").removeClass("show");
        }, 3000);
    }

    // long notify fn.
    hvobj.notify_long_loading = function (msg) {
        // add message
        $("#notify").empty();
        $("#notify").append(msg);

        // show/hide message
        $("#notify").addClass("show");
        setTimeout(function () {
            $("#notify").removeClass("show");
        }, 50000);
    }

    // loader fn.
    hvobj.loader = () => {
        // clean data
        $('#content').empty()

		// get content
        $('#content').append(`
            <div id="loader" style="margin-top: 150px; text-align: center; visibility: hidden;">
				<span class="fo-zi-12"><strong>Loading ...</strong></span>
			</div>
        `)
    }

    // upload image fn.
    hvobj.readURL = (input) => {
        if (input.files && input.files[0]) {
            let reader = new FileReader()

            reader.onload = function (e) {
                $('#customer-image').attr('src', e.target.result)
            }

            reader.readAsDataURL(input.files[0])
        }
    }

    // refreshrotate fn.
    hvobj.refreshrotate = () => {
        // check orientation
        $(window).bind('orientationchange', function (e) {
            let orientation = "portrait"
            if (window.orientation == -90 || window.orientation == 90) orientation = "landscape"

            switch (orientation) {
                case 'portrait':
                    // alert('portrait')
                    window.open(window.location.href, "_self")
                    break
                case 'landscape':
                    // alert('landscape')   
                    window.open(window.location.href, "_self")
                    break
                default:
                    break
            }
        });
    }

    // date (-) split fn.
    hvobj.dateSplit = (str) => {
        let arrstr = []
        try {
            if (typeof str != "string") {
                throw "Not found String."
            }
            arrstr = str.split("-")
        } catch (err) {
            return err
        }
        return arrstr
    }

    // ( ) split fn.
    hvobj.blankSplit = (str) => {
        let arrstr = []
        try {
            if (typeof str != "string") {
                throw "Not found String."
            }
            arrstr = str.split(" ")
        } catch (err) {
            return err
        }
        return arrstr
    }

    // text split fn.
    hvobj.txtSplit = (str, nstr) => {
        let arrstr = []
        try {
            if (typeof str != "string") {
                throw "Not found String."
            }
            arrstr = str.split(nstr)
        } catch (err) {
            return err
        }
        return arrstr
    }

    // empty split fn.
    hvobj.emptySplit = (str, nstr) => {
        let arrstr = []
        try {
            if (typeof str != "string") {
                throw "Not found String."
            }
            arrstr = str.split(" ")
        } catch (err) {
            return err
            //arrstr = err
        }
        return arrstr[nstr]
    }

    // slice number fn.
    hvobj.sliceNum = (str, nstr) => {
        let txt;
        try {
            if (typeof str != "string") {
                throw "Not found String."
            }
            txt = nstr + str.slice(1)
        } catch (err) {
            return err
        }
        return txt
    }

    // new format date fn.
    hvobj.newFormatDate = (str) => {
        let nstr
        let arrstr = []
        try {
            if (typeof str != "string") {
                throw "Not found String."
            }
            arrstr = str.split("-")
        } catch (err) {
            return err
        }

        // get new date format
        nstr = (parseInt(arrstr[2]) - 543) + "/" + arrstr[1] + "/" + arrstr[0]

        return nstr
    }

    // array split fn.
    hvobj.arraySplit = (str, nstr) => {
        let arrstr = []
        try {
            if (typeof str != "string") {
                throw "Not found String."
            }
            // str split
            arrstr = str.split(nstr)
        } catch (err) {
            return err
        }
        return arrstr
    }

    /*
    // array pop fn.
    hvobj.arrayPop = (arr, inx) => {
        try {
            if (typeof arr != "object") {
                throw "Not found Object."
            }
            // query select
            arr.forEach((item, index) => {
                if (item == inx) {
                    arr.splice(index, 1)
                }
            })
        } catch (err) {
            return err
        }
        return arr
    }
    */

    // array remove item all fn.
    hvobj.arrayRemoveItemAll = (arr, value) => {
        let i = 0
        while (i < arr.length) {
            if (arr[i] === value) {
                arr.splice(i, 1)
            } else {
                ++i
            }
        }
        return arr
    }

    // get uid fn.
    hvobj.getuid = (surl, sid, suid) => {
        // load data
        $.ajax({
            url: surl,
            type: "POST",
            data: { id: sid },
            success: (result) => {

                // parse data
                const obj = jQuery.parseJSON(result)

                // check empty data
                if (obj.resultdata != "empty") {

                    if (obj.uid != suid) {
                        sessionStorage.clear()
                        hvobj.redirect("login.html", 1000)
                    } else {
                        // empty data
                    }

                } else {
                    // empty data
                }

            }
        });
    }

    // thshortmonth fn.
    hvobj.thshortmonth = (sm) => {
        let monthtype

        // month type
        switch (parseInt(sm)) {
            case 1: monthtype = "ม.ค."
                break
            case 2: monthtype = "ก.พ."
                break
            case 3: monthtype = "มี.ค."
                break
            case 4: monthtype = "เม.ย."
                break
            case 5: monthtype = "พ.ค."
                break
            case 6: monthtype = "มิ.ย."
                break
            case 7: monthtype = "ก.ค."
                break
            case 8: monthtype = "ส.ค."
                break
            case 9: monthtype = "ก.ย."
                break
            case 10: monthtype = "ต.ค."
                break
            case 11: monthtype = "พ.ย."
                break
            case 12: monthtype = "ธ.ค."
                break
            default: monthtype = "ม.ค."
                break
        }
        return monthtype
    }

    // thshortmonth fn.
    hvobj.thshortmonth = (sm) => {
        let monthtype;

        // month type
        switch (parseInt(sm)) {
            case 1: monthtype = "ม.ค."
                break
            case 2: monthtype = "ก.พ."
                break
            case 3: monthtype = "มี.ค."
                break
            case 4: monthtype = "เม.ย."
                break
            case 5: monthtype = "พ.ค."
                break
            case 6: monthtype = "มิ.ย."
                break
            case 7: monthtype = "ก.ค."
                break
            case 8: monthtype = "ส.ค."
                break;
            case 9: monthtype = "ก.ย.";
                break
            case 10: monthtype = "ต.ค."
                break
            case 11: monthtype = "พ.ย."
                break
            case 12: monthtype = "ธ.ค."
                break
            default: monthtype = "ม.ค."
                break
        }
        return monthtype
    }

    // navbar fn.
    hvobj.navbar = function (liff) {
        var navItems = document.querySelectorAll("ul.nav li");
        var slider = document.querySelectorAll(".slider");

        //For Loop To run through all the nav items
        for (let i = 0; i < navItems.length; i++) {

            //For each nav item Run this function on click
            navItems[i].onclick = (function (i) {
                return function (e) {
                    // add/remove active class
                    navItems.forEach(function (e2, i2) {
                        e2.classList.remove("nav__link--active");
                    })
                    this.classList.add("nav__link--active");

                    //If it contains slider already do nothing.
                    if (this.classList.contains('slider')) {
                        return;
                    }

                    //Translate Slider Element across list
                    let howFar = 25 * i;
                    slider[0].style.left = howFar + "%";

                    // check link
                    switch (i) {
                        case 0:
                            // get mainlist
                            $('#page-name').empty();
                            $('#page-name').append(`<strong>แต้มสะสม</strong>`);
                            Mainim.mainlist(liff);
                            break;
                        case 1:
                            // get scanqr
                            $('#page-name').empty();
                            $('#page-name').append(`<strong>สแกน QR</strong>`);
                            Scanqrim.scanqrstart(liff);
                            break;
                        case 2:
                            // get history
                            $('#page-name').empty();
                            $('#page-name').append(`<strong>ใช้จ่ายแต้ม</strong>`);
                            Historyim.historystart(liff);
                            break;
                        case 3:
                            // get more
                            $('#page-name').empty();
                            $('#page-name').append(`<strong>เพิ่มเติม</strong>`);
                            Moreim.morestart(liff);
                            break;
                        default:
                            // get mainlist
                            $('#page-name').empty();
                            $('#page-name').append(`<strong>แต้มสะสม</strong>`);
                            Mainim.mainlist(liff);
                            break;
                    }
                }
            })(i);
        }
    }

    // toggleshowhide fn.
    hvobj.toggleshowhide = (sf, sp) => {
        $(sf).click(() => $(sp).slideToggle("fast"))
    }

    // get from session (if the value expired it is destroyed)
    hvobj.sessionGet = (key) => {
        let stringValue = window.sessionStorage.getItem(key)
        if (stringValue !== null) {
            let value = JSON.parse(stringValue)
            let expirationDate = new Date(value.expirationDate)
            if (expirationDate > new Date()) {
                return value.value
            } else {
                window.sessionStorage.removeItem(key)
            }
        }
        return null
    }

    // add into session
    hvobj.sessionSet = (key, value, expirationInMin = 10) => {
        let expirationDate = new Date(new Date().getTime() + (60000 * expirationInMin))
        let newValue = {
            value: value,
            expirationDate: expirationDate.toISOString()
        }
        window.sessionStorage.setItem(key, JSON.stringify(newValue))
    }

    hvobj.setCookie = (cname, cvalue, exdays) => {
        const d = new Date()
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
        let expires = "expires=" + d.toUTCString()
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
    }

    hvobj.getCookie = (cname) => {
        let name = cname + "="
        let decodedCookie = decodeURIComponent(document.cookie)
        let ca = decodedCookie.split(';')
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i]
            while (c.charAt(0) == ' ') {
                c = c.substring(1)
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length)
            }
        }
        return ""
    }

    hvobj.eraseCookie = (name) => hvobj.setCookie(name, "", -1)

    // getmid fn.
    hvobj.getmid = (surl, sid, suid) => {
        // clean data
        $(suid).empty()

        // load data
        $.ajax({
            url: surl,
            type: "POST",
            data: { id: sid },
            success: (result) => {
                // parse data
                const obj = jQuery.parseJSON(result)
                // check empty data
                obj.resultdata != "empty" ? $(suid).append(obj.member_name) : $(suid).append(`No data!`)
            }
        })
    }

    // return object.
    return hvobj
})()