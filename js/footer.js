const createFooter = () =>{
    let footer= document.querySelector('.footer');
    
    footer.innerHTML=  `
    <div class="footer-content">
                <img src="img/light-logo.png" alt="" class="logo">
                <div class="footer-ul-container">
                    <ul class="category">
                        <li class="category-title">Hombre</li>
                        <li><a href="" class="footer-link">camisetas</a></li>
                        <li><a href="" class="footer-link">sudaderas</a></li>
                        <li><a href="" class="footer-link">camisas</a></li>
                        <li><a href="" class="footer-link">jeans</a></li>
                        <li><a href="" class="footer-link">pantalones</a></li>
                        <li><a href="" class="footer-link">zapatos</a></li>
                        <li><a href="" class="footer-link">formal</a></li>
                        <li><a href="" class="footer-link">sports</a></li>
                        <li><a href="" class="footer-link">reloj</a></li>
                    </ul>
                    <ul class="category">
                        <li class="category-title">Mujer</li>
                        <li><a href="" class="footer-link">camisetas</a></li>
                        <li><a href="" class="footer-link">sudaderas</a></li>
                        <li><a href="" class="footer-link">camisas</a></li>
                        <li><a href="" class="footer-link">jeans</a></li>
                        <li><a href="" class="footer-link">pantalones</a></li>
                        <li><a href="" class="footer-link">zapatos</a></li>
                        <li><a href="" class="footer-link">formal</a></li>
                        <li><a href="" class="footer-link">sports</a></li>
                        <li><a href="" class="footer-link">reloj</a></li>
                    </ul>
                </div>
            </div>
            <p class="footer-title">About Company</p>
            <p class="info">Lorem ipsum dolor sit, amet consectetur 
                adipisicing elit. Distinctio nemo magnam impedit itaque
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                 Nihil sed veritatis fuga necessitatibus 
                eos cumque aliquid rem sapiente autem? Esse, 
                dolores vitae! Distinctio, debitis error fuga nemo exercitationem consequatur 
                quo! aliquam. Iusto veniam dignissimos repellendus aspernatur quam, 
                vel maxime doloribus tempora eveniet rerum et asperiores explicabo. Nihil.</p>
                <p class="info">emails - ing.diegorodriguezv@gmail.com, 
                    g.sgsi.darv@outlook.com</p>
                <p class="info">telephone - 977 509 592, 953 267 595</p>
                <div class="footer-social-container">
                    <div>
                        <a href="#" class="social-link">terms & services</a>
                        <a href="#" class="social-link">privacy page</a>
                    </div>
                    <div>
                        <a href="#" class="social-link">Instagram</a>
                        <a href="#" class="social-link">Facebook</a>
                        <a href="#" class="social-link">Twitter</a>
                    </div>
                </div>
                <p class="footer-credit">DiegoRod, Pagina de Prueba</p>`
}
createFooter();