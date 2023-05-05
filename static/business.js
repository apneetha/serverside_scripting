//var table = document.getElementById('table')
function check2() {
    event.preventDefault();
    document.getElementById('detailed-values').innerHTML = '';
    document.getElementById('detailed-values').style.display = 'none';
    console.log('Hello World');
    if (document.getElementById("autolocation").checked) {
        fetch('https://ipinfo.io/json?token=bd65a530dbe4c9', )
            .then(res => res.json())
            .then(data => {
                var long_lat = data.loc.split(',');
                api(long_lat[0], long_lat[1]);
            })
    } else {
        var address = document.getElementById('location').value;
        fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key=AIzaSyD4S5nEJy8OyYsXCf2paxi37NxycLvP29M', )
            .then(res => res.json())
            .then(data => {
                if(data.results==''){
                     document.getElementById('table').innerHTML='<span style="DISPLAY: FLEX;JUSTIFY-CONTENT: CENTER;font-size:20px">Please Enter a valid address</span>';
           //  document.getElementById('detailed-values').innerHTML.style='text';
                      document.getElementById('table').scrollIntoView();
                }
                else{
                   var lange = JSON.stringify(data.results[0].geometry.location.lat, undefined, 2);
                var longitude = JSON.stringify(data.results[0].geometry.location.lng, undefined, 2);
                console.log(lange,longitude);
                api(lange, longitude);

                }

            })
    }


}

function api(lat, long) {
//    var head = document.getElementsByTagName('HEAD')[0];
//    var link = document.createElement('link');
//    link.rel = 'stylesheet';
//    link.type = 'text/css';
//    link.href = 'style.css';
//    // Append link element to HTML head
//    head.appendChild(link);

console.log('sq');

    var j_keyword = document.getElementById('keyword').value;
    var j_distance = document.getElementById('distance').value;
    var j_distance_meter = (j_distance * 1609);
    var j_categories = document.getElementById('cat');
    var category_value = j_categories.options[j_categories.selectedIndex].text;
    //document.write(j_distance, j_keyword, category_value, lat, long);
    // console.log('222222222');
    url = '/getdata?term=' + j_keyword + '&latitude=' + lat + '&longitude=' + long + '&categories=' + category_value + '&radius=' + j_distance_meter
    let fetchRes = fetch(url);
    fetchRes.then(res =>
        res.json()).then(d => {
        if(d.businesses==''){
             document.getElementById('table').innerHTML='<span style="DISPLAY: FLEX;JUSTIFY-CONTENT: CENTER;font-size:20px;">No record has been found</span>';
           //  document.getElementById('detailed-values').innerHTML.style='text';
             document.getElementById('table').scrollIntoView();
        }
        else{
            display_table(d);
        }

    })

}

function display_table(d) {

    var table_div = document.getElementById('table')
    console.log(d.businesses);
    console.log(d.businesses[1].id);
    const table = document.createElement("table");
    let tr = table.insertRow(-1);
    html_text = "<table id='tableeee' border='2'>";
    html_text += "<tbody>";
    html_text += "<th width='50px'>No.</th>"
    html_text += "<th>Image</th>"
    html_text += "<th width='600px' !important><a onclick='sortTable(2,0)' id='col20'>Business Name</a>"
    html_text += "<a onclick='sortTable(2,1)' id='col21' hidden>Business Name</a></th>"
    html_text += "<th width='120px'><a onclick='sortTable(3,0)' id='col30' hidden>Rating</a>"
    html_text += "<a onclick='sortTable(3,1)' id='col31'>Rating</a></th>"
    html_text += "<th width='120px'><a onclick='sortTable(4,0)'id='col40'>Distance (miles)</a>"
    html_text += "<a onclick='sortTable(4,1)' id='col41' hidden>Distance (miles)</a></th>"

    for (let i = 0; i < d.businesses.length; i++) {

        html_text += "<tr>";
        html_text += "<td>" + (i+1) + "</td>"
        html_text += "<td id='td_img'><img src='" + d.businesses[i].image_url + "' width='" + 80 + "' height='" + 80 + "'></td>";
        var bname = "'" + d.businesses[i].id + "'"
        var a_name = '"bus_api(' + bname + ')"'
        html_text += "<td><a onclick =" + a_name + ">" + d.businesses[i].name + "</td>"
        html_text += "<td>" + d.businesses[i].rating + "</td>"
        var dm = ((d.businesses[i].distance) / 1609).toFixed(2);
        html_text += "<td>" + dm + "</td>"

        html_text += "</tr>";

    }
    html_text += "</tbody>";
    html_text += "</table>";
    table_div.innerHTML =html_text;

    document.getElementById('table').scrollIntoView();



}

function sortTable(column_number, order) {   /*Sample code referred from from W3schools and worked upon it */
    console.log(column_number, order);
    var i = (order + 1) % 2;
    var b = 'col' + column_number + i;
    var a = 'col' + column_number + order;
    document.getElementById(a).style.display = "none";
    document.getElementById(b).style.display = "block";

    var table, rows, swap, i, x, y, s;
    table = document.getElementById("tableeee");
    swap = true;
    rows = table.rows;

    if (order == 0) {
        while (swap) {
            swap = false;
            for (i = 1; i < (rows.length - 1); i++) {
                s = false;
                x = rows[i].getElementsByTagName("TD")[column_number].textContent;
                y = rows[i + 1].getElementsByTagName("TD")[column_number].textContent;
                if (x.toLowerCase() > y.toLowerCase()) {
                    s = true;
                    break;
                } else {
                    s = false;
                }

            }
            if (s) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                swap = true;
            }

        }

    } else if (order == 1) {
        while (swap) {

            swap = false;
            rows = table.rows;

            for (i = 1; i < (rows.length - 1); i++) {
                s = false;
                x = rows[i].getElementsByTagName("TD")[column_number].textContent;
                y = rows[i + 1].getElementsByTagName("TD")[column_number].textContent;
                console.log(x,y);

                if (x.toLowerCase() < y.toLowerCase()) {

                    s = true;
                    break;
                } else {
                    s = false;
                }

            }
            if (s) {

                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                swap = true;
            }

        }

    }

    for (i = 1; i < (rows.length ); i++)
        rows[i].getElementsByTagName("td")[0].innerHTML = i;

}


function bus_api(b_id) {
    //document.write(b_id);
    url = '/getbdata?b_id=' + b_id
    let fetchRes = fetch(url);
    fetchRes.then(res =>
        res.json()).then(d => {
        console.log(d)
        display_bus(d)

    })
}

function display_bus(b) {
    var detailed_values = document.getElementById('detailed-values')
    detailed_values.innerHTML= '';
    detailed_values.style.display = "block";
    html_text = "<div id='b_details'>"
    html_text = "<div class='title'> <center> <label class='heading'>"+b.name+" </label> </center><hr> </div>"
    var status;
    if(b.hours){
         if (b.hours[0].is_open_now)
                 status = "<p class='status' style='background-color:green'>Open Now</p>"
         else
         status = "<p class='status' style='background-color:red'>Closed</p>"

        html_text += "<div class='card'> <label class='heading'> Status  </label> " + status + "</div> "

    }


    if (b.categories){
         var category = b.categories[0].title;
        for (i = 1; i < b.categories.length; i++)
        category += ' | ' + b.categories[i].title;
        html_text += "<div class='card'> <label class='heading'> Category  </label> " + category + "</div>"
    }

    if(b.location.display_address)
    html_text+= "<div class='card'><label class='heading'> Address</label>" +  b.location.display_address + " </div>"
   // html_text += "<div class='card'> <label class='heading'> Address  </label> " + (b.location.address1 ? b.location.address1 : '') + " " + (b.location.address2 ? b.location.address2 : '') + " " + (b.location.address3 ? b.location.address3 : '') + "  " + (b.location.city ? b.location.city : '') + "  " + (b.location.country ? b.location.country : '') + "</div> "
    if (b.phone){
            var phone = b.phone;
         var us_phone = '(' + phone.slice(2, 5) + ') '+ phone.slice(5,8) +'-'+phone.slice(8,12);
        html_text += "<div class='card'> <label class='heading'> Phone Number </label> " + us_phone + "</div>"

    }

    if (String(b.transactions)){
           var transaction = String(b.transactions);
          transaction = b.transactions[0].charAt(0).toUpperCase() + b.transactions[0].slice(1)
          if(b.transactions[1])
           transaction+=' | ' + b.transactions[1].charAt(0).toUpperCase()+ b.transactions[1].slice(1) ;

    console.log(transaction);
        html_text += "<div class='card'> <label class='heading'> Transaction Supported </label> " + transaction + "</div> "
    }

    if (b.price)
    html_text += "<div class='card'> <label class='heading'> Price </label> " + b.price + "</div>"
    html_text += "<div class='card'> <label class='heading'> More Info </label> <a href='" + b.url + "' target='_blank'>Yelp</a></div>"

    html_text += "<div class='img_div'><figure><div class='img_box'><img id='img1' src='" + b.photos[0] + "' width='" + 100 + "%' ></div><figcaption>Photo 1</figcaption></figure>."
    html_text += "<figure><div class='img_box'><img id='img2' src='" + b.photos[1] + "' width='" + 100 + "%' ></div><figcaption>Photo 2</figcaption></figure>"
    html_text += "<figure><div class='img_box'> <img id='img3'  src='" + b.photos[2] + "' width='" + 100 + "%'></div><figcaption>Photo 3</figcaption></figure>"
    html_text += " </figure></div>"
    //document.write(html_text);

    detailed_values.innerHTML +=html_text;
    var img1 = document.getElementById('img1');
    var img2 = document.getElementById('img2');
    var img3 = document.getElementById('img3');

    var img_h3=180;
    var img_h2=180;
    var img_h1=180;

    img1.onload=function(){
          img_h1 = img1.height;
          console.log(img_h1);


    }

    img2.onload=function(){
          img_h2 = img2.height;
          console.log(img_h2);


    }


    img3.onload=function(){
          img_h3 = img3.height;
          console.log(img_h3);

    }


    setTimeout(function(){

            max_height=Math.max(img_h1,img_h2,img_h3) + 6 + 'px';
            console.log(max_height);
            document.getElementsByClassName('img_box')[0].style.height=max_height ;
            document.getElementsByClassName('img_box')[1].style.height=max_height;
             document.getElementsByClassName('img_box')[2].style.height=max_height;
             document.getElementById('detailed-values').scrollIntoView();
    },1200);



}
