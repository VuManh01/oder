document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.querySelector('.cart-icon');
    const sidebar = document.getElementById('sidebar');
    const sidebarClose = document.querySelector('.sidebar-close'); // Changed class to sidebar-close
    const cartItems = document.querySelector('.cart-items'); // Changed class to cart-items
    const cartTotal = document.querySelector('.cart-total');
    const addToCartIcons = document.querySelectorAll('.add-to-cart'); // Changed class to add-to-cart

    let cart = [];
    let totalAmount = 0;

    // Hàm thêm sản phẩm vào giỏ hàng
    function addToCart(title, price) {
        const item = cart.find(item => item.title === title);
        if (item) {
            item.quantity += 1;
        } else {
            cart.push({ title, price, quantity: 1 });
        }
        updateCart();
    }

    // Hàm cập nhật giỏ hàng
    function updateCart() {
        cartItems.innerHTML = '';
        totalAmount = 0;

        cart.forEach((item, index) => {
            totalAmount += item.price * item.quantity;
            const cartItem = document.createElement('div');
            cartItem.classList.add('individual-cart-item'); // Added class individual-cart-item
            cartItem.innerHTML = `
                <div>${item.title} x${item.quantity}</div>
                <div class="cart-item-price">${item.price * item.quantity}đ</div>
                <button class="increase-quantity" data-index="${index}">+</button>
                <button class="decrease-quantity" data-index="${index}">-</button>
                <button class="remove-item" data-index="${index}">Remove</button>
            `;
            cartItems.appendChild(cartItem);
        });

        cartTotal.textContent = `${totalAmount}đ`;
    }

    // Hàm tăng số lượng sản phẩm
    function increaseQuantity(index) {
        cart[index].quantity += 1;
        updateCart();
    }

    // Hàm giảm số lượng sản phẩm
    function decreaseQuantity(index) {
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
        } else {
            cart.splice(index, 1); // Xóa sản phẩm nếu số lượng bằng 1
        }
        updateCart();
    }

    // Hàm xóa sản phẩm khỏi giỏ hàng
    function removeItem(index) {
        cart.splice(index, 1);
        updateCart();
    }

    // Xử lý sự kiện khi nhấp vào các nút "Thêm vào giỏ hàng"
    addToCartIcons.forEach(icon => {
        icon.addEventListener('click', (event) => {
            const card = event.target.closest('.card');
            const title = card.querySelector('.card--title').textContent;
            const price = parseFloat(card.querySelector('.card--price .price').textContent.replace(/[^0-9]/g, ''));
            addToCart(title, price);
        });
    });

    // Xử lý sự kiện khi nhấp vào biểu tượng giỏ hàng để mở thanh bên
    cartIcon.addEventListener('click', () => {
        sidebar.classList.toggle('sidebar-open');
    });

    // Xử lý sự kiện khi nhấp vào nút đóng thanh bên
    sidebarClose.addEventListener('click', () => {
        sidebar.classList.remove('sidebar-open');
    });

    // Xử lý sự kiện khi nhấp vào các nút tăng/giảm số lượng và xóa sản phẩm
    cartItems.addEventListener('click', (event) => {
        if (event.target.classList.contains('increase-quantity')) {
            const index = event.target.getAttribute('data-index');
            increaseQuantity(index);
        } else if (event.target.classList.contains('decrease-quantity')) {
            const index = event.target.getAttribute('data-index');
            decreaseQuantity(index);
        } else if (event.target.classList.contains('remove-item')) {
            const index = event.target.getAttribute('data-index');
            removeItem(index);
        }
    });

    // Đảm bảo rằng thanh bên không mở khi tải trang
    sidebar.classList.remove('sidebar-open');
});
