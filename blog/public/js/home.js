fetch("/blog/blogs")
    .then((response) => response.json())
    .then((data) =>
        data.map((item) => {
            let img = document.createElement("img")
            img.src = item.image
            img.style.width = "310px"

            let title = document.createElement("p")
            title.innerHTML = item.title

            let div = document.createElement("div")
            div.append(img, title)
            div.setAttribute("class", "list")
            
            div.addEventListener("click",()=>{
                window.location.href=`/blog/singleBlog/${item._id}`
            })
            document.getElementById("parent-box").append(div)
        })
    )