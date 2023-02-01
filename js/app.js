// Variables declaration.
const showCartButton = document.querySelector(".cart__button");
const closeCartButton = document.querySelector(".close__cart");
const cleanCartButton = document.querySelector(".clean__cart");
const cart = document.querySelector(".cart");
const filterPage = document.querySelector(".filter");
let textCart = cart.querySelector(".no__courses-text");
const courses = document.querySelector(".courses");
let cartCourses = [];

addingEventListeners();

//Adding Event Listeners.
function addingEventListeners() {
   showCartButton.addEventListener("click", showCart);
   closeCartButton.addEventListener("click", () => {
      cart.classList.add("no-visible");
      showCartButton.classList.remove("cart__active");
      filterPage.classList.add("no-visible");
   });
   cleanCartButton.addEventListener("click", () => {
      cartCourses = [];
      createHTML();
   });
   cart.addEventListener("click", deleteCourse);
   courses.addEventListener("click", addCourse);
}

//Functions:
//Function to show the cart on te screen.
function showCart(){
   showCartButton.classList.toggle("cart__active");
   if(showCartButton.classList.contains("cart__active")){
      cart.classList.remove("no-visible");
      filterPage.classList.remove("no-visible");
   } else {
      cart.classList.add("no-visible");
      filterPage.classList.add("no-visible");
   }
}

//Function to add the course to the cart.
function addCourse(e) {
   const course = e.target.parentElement.parentElement;
   if (e.target.classList.contains("button__addtocart")) {
      const courseInfo = {
         id: course.getAttribute("id"),
         image: course.querySelector(".course__image-item").src,
         name: course.querySelector(".course__title").textContent,
         price: course.querySelector(".course__price-item.new").textContent,
         amount: 1,
      };

      if (courseIsInCart(courseInfo)[0]){
         cartCourses[courseIsInCart(courseInfo)[1]].amount++;
      } else {
         cartCourses.push(courseInfo);
      }

      createHTML();
   }
}

//Function to check if the course selected is already in the cart.
function courseIsInCart(course) {
   courseExists = [false, -1];
   cartCourses.forEach((c, i) => {
      if (c.id === course.id) {
         courseExists[0] = true;
         courseExists[1] = i;
      }
   });
   return courseExists;
}

//Function to create HTML code for add to the HTML's cart element.
function createHTML(){
   cartBody = cart.querySelector(".cart__courses");
   cleanHTML();

   if (cartCourses.length > 0) {
      textCart.innerHTML = "";
      cartCourses.forEach(course => {
         const {id, image, name, amount, price} = course;
         const courseCartCode = document.createElement("div");
         courseCartCode.classList.add("cart__courses-item");
   
         courseCartCode.innerHTML = `
            <div class="cart__courses-img">
               <img src=${image} alt="course-img" width="100">
            </div>
            <div class="cart__courses-title">
               <span>${name}</span>
            </div>
            <div class="cart__courses-price">
               <span>${price}</span>
            </div>
            <div class="cart__courses-cant">
               <span>${amount}</span>
            </div>
            <button class="delete-course" id="${id}">-</button> 
      `;

      cartBody.appendChild(courseCartCode);
      });
   } else textCart.innerHTML = "No hay cursos disponibles";
}

//Function to decrease the amount of courses or delete it.
function deleteCourse(e) {
   if(e.target.classList.contains("delete-course")) {
      const courseId = e.target.getAttribute("id");
      cartCourses.forEach((c, i) => {
         if (c.id === courseId) {
            console.log(`course: ${c.name}`);
            if(c.amount > 1) {
               cartCourses[i].amount--;
            }
            else {
               cartCourses.splice(i, 1);
            }
         }
      });
      createHTML();
   }
}

//Function to clean the HTML code for the courses cart body.
function cleanHTML() {
   while (cartBody.firstChild) cartBody.removeChild(cartBody.firstChild);
}