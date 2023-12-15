# Frontend Mentor - E-commerce product page solution

This is a solution to the [E-commerce product page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/ecommerce-product-page-UPsZ9MJp6). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)

## Overview

![](/public/screenshort/desktop-design.png)

### Links

- Solution URL: [GitHub Repo](https://github.com/obed-smart/ecommerce-product-site)
- Live Site URL: [GitHub Pages](https://obed-smart.github.io/ecommerce-product-site/)

## My process

### Built with

- Semantic HTML5 markup
- Sass custom properties
- vanilla javascript
- vite

### What I learned

well, this is my first vite project or my first modules bundler project build  with vanilla javascript, HTML5 and Scss. where i find it hard is when i want to host the project on github, at first use use deploy from branch as i usually do on other project but it did work out and in this case i find it hard as a beginner i use youtube to know if i can find the anwser but i end up being confused at the end because am only seeing vite react and vue project hosted on github using github Action. The main reason why am confused is because when you create a vite react project its create a  vite.config.js by default where you will add a base domian to your project. I find it hard on my vanilla javascript project because of vite.config.js file not being created my default and i look for where to add the base domain ('/') ('/repo name/'), but finally i found out that i have to create a vite config file and then set the base befor going to github to create a workflow for my project  




```Sass/Scss
<h1>Some Sass code I'm proud of</h1>

 @media screen and (max-width: 768px) {
        flex-direction: column;
        position: fixed;
        width: 65%; 
        height: 100%;
        right: 0;
        top: 0;
        background-color: $white;
        flex-direction: column;
        z-index: 100;
        text-align: left;
        gap: var(--gap, 2rem);
        padding: min(20vh, 7rem) 3rem;
        left: -250px;
        transition: 0.8s;
        opacity: 0;

        &[data-visible = "true"]{
            left: 0;
            opacity: 1;

        }
       
          }

```

  ```javascript

<h1>Some javascript code I'm proud of</h1>

  // function to create cloneproductView

let cloneProductPageReview;
let clonethumbnailContainer;
let cloneproductReview;


const createClone = () => {
    if (!isCloned) {
        clone = productView.cloneNode(true);
        cloneproductView.appendChild(clone);
        isCloned = true;

        document.body.classList.add("blurred")
        cloneproductView.style.display = "block"

        clonethumbnails = clone.querySelectorAll(".product-thumbnail");
        clonethumbnailContainer = clone.querySelectorAll(".thumbnail-container");
        cloneproductReview = clone.querySelector(".product-review");

        clonethumbnailContainer.forEach(thumbnail => {
            thumbnail.addEventListener("click", (event) => {
                clonethumbnailContainer.forEach(clonethumb => {
                    clonethumb.classList.remove("active-thumbnail");
                });

                thumbnailContainer.forEach(thumb => {
                    thumb.classList.remove("active-thumbnail")
                })

                thumbnail.classList.add('active-thumbnail');

                const cloneimagesrc = event.currentTarget.querySelector(".product-thumbnail").getAttribute("data-image");
                productReview = document.querySelector(".product-review");

                productReview.src = cloneimagesrc;
                cloneproductReview.src = cloneimagesrc;
            })
        });

        // call and append buttons to cloneProductPageReview

        cloneProductPageReview = clone.querySelector(".product-page-review")

        cloneProductPageReview.appendChild(backButton);
        cloneProductPageReview.appendChild(nextButton);


        // call and append the close cloneproductView
        cloneproductView.appendChild(hideCloneButton)


    } else {
        clone = productView.cloneNode(false);

    }
}     
```


## Author

- Frontend Mentor - [@obed-smart](https://www.frontendmentor.io/profile/obed-smart)
