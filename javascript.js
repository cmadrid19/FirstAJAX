addEventListener('load',inicializarEventos,false);

function inicializarEventos()
{
  for(f=1;f<=5;f++)
  {
    var ob=document.getElementById('enlace'+f);
    ob.addEventListener('click',presionEnlace,false);
  }
}

function presionEnlace(e)
{
    e.preventDefault();
    let id=e.target.getAttribute('href');
    cargarHoroscopo("./albumes.php?id=" + id); 
}

var conexion1;
function cargarHoroscopo(url) 
{
  conexion1=new XMLHttpRequest();  
  conexion1.onreadystatechange = procesarEventos;
  conexion1.open("GET", url, true);
  conexion1.send();
}

function procesarEventos()
{
  var detalles = document.getElementById("detalles");
  if(conexion1.readyState == 4)
  {
    let result = JSON.parse(conexion1.responseText);

    detalles.innerHTML = '';

    let content = document.createElement("ul");
    content.classList.add("lista-canciones");

    for(let item of result.canciones){
        content.innerHTML += `
            <li>${item}</li>
        `.trim();
    }

    let imgAlbum = document.createElement("img");
    imgAlbum.src = result.img;
    imgAlbum.classList.add("img-album");

    imgAlbum.classList.add("girar");

    detalles.appendChild(content);
    detalles.appendChild(imgAlbum);
  } 
  else 
  {
    detalles.innerHTML = 'Cargando...';
  }
}
