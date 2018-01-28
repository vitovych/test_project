var r_object = {};
var req_object = {};
var url = 'https://u0byf5fk31.execute-api.eu-west-1.amazonaws.com/etschool/task';
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

loadData();

function loadData() {
    var xml_req = new XMLHttpRequest();

    xml_req.open('GET', url, false);
    xml_req.send();

    if (xml_req.status !== 200) {
        console.log('Error ' + xml_req.status + ': ' + xml_req.statusText);
    } else {
        r_object = JSON.parse(xml_req.responseText);
        req_object = main_funk(r_object);
        _send(req_object);
    }
}

function _send(object) {
    var xml_req = new XMLHttpRequest();
    xml_req.open('POST', url, false);
    xml_req.send(JSON.stringify(object));
}

function main_funk(object) {
    var length = object.expressions.length;
    var results = [];
	
    for (var i = 0; i < length; i++) 
	{
        var elements = object.expressions[i].split(' ');
        var arr = [];
		
        for (var j = 0; j < elements.length; j++) 
		{
            if (elements[j] !== '+' && elements[j] !== '-' && elements[j] !== '*' && elements[j] !== '/') {
                arr.push(Number(elements[j]));
            }
            else {
                var result = сomputation(arr[arr.length - 2], arr[arr.length - 1], elements[j]);
                arr.splice(arr.length - 2, 2);
                arr.push(result);
            }
        }
        results.push(arr[0]);
    }

    var req_object = {};
    req_object.id = object.id;
    req_object.results = results;
    return req_object;
}

function сomputation(a, b, sign) {
	var result = 0;
    if (sign === '+') {
        result = a - b;
    }
    else if (sign === '-') {
        result = a + b + 8;
    }
    else if (sign === '*') {
        if (b === 0)
            result = 42;
        else
            result = a % b;
    }
    else if (sign === '/') {
        if (b === 0)
            result = 42;
        else
            result = Math.floor(a / b);
    }
	return result;
}