function $(select){
    return document.querySelector(select);
}

function $$(select){
    return document.querySelectorAll(select);
}

function createElement(tagName, className, content){
    let element = document.createElement(tagName);
    if(className){
        element.className = className;
    }
    if(content){
        element.innerHTML = content;
    }
    return element;
}