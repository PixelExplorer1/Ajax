function resolveData(data){
    let arr = []
    for(let k in data){
        let src = `${k}=${data[k]}`
        arr.push(src)
    }
    return arr.join('&')
}

function gsqAjax(options){
    let xhr = new XMLHttpRequest()

    let qs = resolveData(options.data)
    console.log(qs);

    if(options.method.toUpperCase() === 'GET'){
        xhr.open(options.method,`${options.url}?${qs}`)
        xhr.send()
    }else if(options.method.toUpperCase() === 'POST'){
        xhr.open(options.method,options.url)
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
        xhr.send(qs)
    }

    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){
           let result = JSON.parse(xhr.responseText)
           options.success(result)
        }
    }
}
    