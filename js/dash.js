function createCategory(event){
    event.preventDefault();
    const spinItem = document.querySelector(".spin");
    spinItem.style.display = "inline-block";
    const getName = document.getElementById("catName").value;
    const getImg = document.getElementById("catImage").files[0];
    // const preview = document.getElementById("preview");
    // const catNameInput = document.getElementById("catName");
    // const catImageInput = document.getElementById("catImage");
    // const previewDiv = document.getElementById("preview");
    if (getName === "" || getImg === "") {
        Swal.fire({
            icon: 'info',
            text: 'All fields are required!',
            confirmButtonColor: "#2D85DE"
        })
        spinItem.style.display = "none";
        return;
    }
    else {
        const token = localStorage.getItem("key");
        const dashItem = new Headers();
        dashItem.append("Authorization", `Bearer ${token}`);
        const catData = new FormData();
        catData.append("name", getName);
        catData.append("image", getImg);
        const catMethod = {
            method: 'POST',
            headers: dashItem,
            body: catData
        };
        const url = `localhost:3001/byc/document/api/categories`;
        fetch(url, catMethod)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result.status === "success") {
                Swal.fire({
                    icon: 'success',
                    text: `${result.message}`,
                    confirmButtonColor: "#2D85DE"
                })
                setTimeout(() => {
                    location.reload();
                }, 4000)
            }
            else {
                Swal.fire({
                    icon: 'info',
                    text: `${result.message}`,
                    confirmButtonColor: "#2D85DE"
                })
                spinItem.style.display = "none";
            }
        })
        .catch(error => console.log('error', error));
    }
}