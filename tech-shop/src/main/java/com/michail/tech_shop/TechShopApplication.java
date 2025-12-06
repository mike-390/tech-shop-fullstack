package com.michail.tech_shop;

import com.michail.tech_shop.entity.Category;
import com.michail.tech_shop.entity.Product;
import com.michail.tech_shop.entity.User;
import com.michail.tech_shop.repository.CategoryRepository;
import com.michail.tech_shop.repository.ProductRepository;
import com.michail.tech_shop.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;

@SpringBootApplication
public class TechShopApplication {

    public static void main(String[] args) {
        SpringApplication.run(TechShopApplication.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(CategoryRepository categoryRepository,
                                        ProductRepository productRepository,
                                        UserRepository userRepository,
                                        PasswordEncoder passwordEncoder) {
        return args -> {

            // Create Categories

            // Smartphones
            Category smartphones = categoryRepository.findByName("Smartphones");
            if (smartphones == null) {
                smartphones = new Category("Smartphones", "Latest technology mobile phones");
                categoryRepository.save(smartphones);
            }

            // Laptops
            Category laptops = categoryRepository.findByName("Laptops");
            if (laptops == null) {
                laptops = new Category("Laptops", "High performance laptops for work and gaming");
                categoryRepository.save(laptops);
            }

            // Gaming
            Category gaming = categoryRepository.findByName("Gaming");
            if (gaming == null) {
                gaming = new Category("Gaming", "Consoles, accessories and gaming gear");
                categoryRepository.save(gaming);
            }

            // Audio
            Category audio = categoryRepository.findByName("Audio");
            if (audio == null) {
                audio = new Category("Audio", "Headphones, speakers and audio equipment");
                categoryRepository.save(audio);
            }

            // Wearables
            Category wearables = categoryRepository.findByName("Wearables");
            if (wearables == null) {
                wearables = new Category("Wearables", "Smartwatches and fitness trackers");
                categoryRepository.save(wearables);
            }

            // Cameras
            Category cameras = categoryRepository.findByName("Cameras");
            if (cameras == null) {
                cameras = new Category("Cameras", "Digital cameras, drones and action cams");
                categoryRepository.save(cameras);
            }

            // Create Products

            // Check if products exist to avoid duplicates on re-run (checking one representative product)
            if (productRepository.findByName("Google Pixel 8 Pro").isEmpty()) {

                // --- Smartphones ---
                productRepository.save(new Product(
                        "Google Pixel 8 Pro",
                        "The all-pro phone engineered by Google. It has the best Pixel Camera yet.",
                        new BigDecimal("999.00"),
                        25,
                        "https://images.unsplash.com/photo-1706412703794-d944cd3625b3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                        smartphones
                ));

                productRepository.save(new Product(
                        "Xiaomi 14 Ultra",
                        "Co-engineered with Leica. A camera that happens to be a phone.",
                        new BigDecimal("1099.00"),
                        15,
                        "https://images.unsplash.com/photo-1598327106026-d9521da673d1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHhpYW9taSUyMDE0JTIwVWx0cmF8ZW58MHx8MHx8fDA%3D",
                        smartphones
                ));

                productRepository.save(new Product(
                        "Samsung Galaxy S24 Ultra",
                        "Galaxy AI is here. Note-worthy features with built-in S Pen and nightography camera.",
                        new BigDecimal("1299.99"),
                        29,
                        "https://images.unsplash.com/photo-1709744722656-9b850470293f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNhbXN1bmclMjBnYWxheHklMjBzMjQlMjB1bHRyYXxlbnwwfHwwfHx8MA%3D%3D",
                        smartphones
                ));

                productRepository.save(new Product(
                        "iPhone 15 Pro Max",
                        "Titanium design, A17 Pro chip, 48MP Main camera. The most powerful iPhone ever created.",
                        new BigDecimal("1499.00"),
                        44,
                        "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=2070&auto=format&fit=crop",
                        smartphones
                ));

                productRepository.save(new Product(
                        "iPhone 17 Black 256GB",
                        "Lightning-fast A19 Bionic chip, stunning Super Retina XDR display, pro-level camera system, and all-day battery life — the future in your hands.",
                        new BigDecimal("987.00"),
                        9,
                        "https://plus.unsplash.com/premium_photo-1680985551022-ad298e8a5f82?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aVBob25lJTIwMTclMjBCbGFjayUyMDI1NkdCfGVufDB8fDB8fHww",
                        smartphones
                ));

                // --- Laptops ---
                productRepository.save(new Product(
                        "Dell XPS 15",
                        "Immersive display, life-like color, and powerhouse performance in a stunning design.",
                        new BigDecimal("1899.00"),
                        12,
                        "https://images.unsplash.com/photo-1593642633279-1796119d5482?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                        laptops
                ));

                productRepository.save(new Product(
                        "Razer Blade 16",
                        "The world's first dual-mode mini-LED display laptop for gaming and creating.",
                        new BigDecimal("2699.00"),
                        8,
                        "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1964&auto=format&fit=crop",
                        laptops
                ));

                productRepository.save(new Product(
                        "MacBook Pro 16 M3 Max",
                        "Mind-blowing performance. Up to 22 hours of battery life. The best laptop display ever.",
                        new BigDecimal("3499.00"),
                        9,
                        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2026&auto=format&fit=crop",
                        laptops
                ));

                productRepository.save(new Product(
                        "ASUS Zenbook Duo",
                        "Dual screen laptop for ultimate productivity. Multitasking redefined.",
                        new BigDecimal("1599.00"),
                        13,
                        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop",
                        laptops
                ));

                // --- Gaming ---
                productRepository.save(new Product(
                        "Xbox Series X",
                        "The fastest, most powerful Xbox ever. 12 teraflops of processing power.",
                        new BigDecimal("499.00"),
                        34,
                        "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?q=80&w=1932&auto=format&fit=crop",
                        gaming
                ));

                productRepository.save(new Product(
                        "Logitech G502 X Plus",
                        "The world's most popular gaming mouse, reinvented. Hybrid optical-mechanical switches.",
                        new BigDecimal("149.00"),
                        100,
                        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=2067&auto=format&fit=crop",
                        gaming
                ));

                productRepository.save(new Product(
                        "PlayStation 5 Slim",
                        "Play Has No Limits. Lightning fast loading with an ultra-high speed SSD.",
                        new BigDecimal("499.00"),
                        50,
                        "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=2070&auto=format&fit=crop",
                        gaming
                ));

                productRepository.save(new Product(
                        "Steam Deck OLED",
                        "Portability meets power. Your Steam library, anywhere.",
                        new BigDecimal("549.00"),
                        20,
                        "https://images.unsplash.com/photo-1718966324513-b74133b41f73?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fFN0ZWFtJTIwRGVjayUyME9MRUR8ZW58MHx8MHx8fDA%3D",
                        gaming
                ));

                productRepository.save(new Product(
                        "Nintendo Switch OLED",
                        "7-inch OLED screen, wide adjustable stand, dock with a wired LAN port, 64 GB of internal storage, and enhanced audio.",
                        new BigDecimal("349.00"),
                        45,
                        "https://images.unsplash.com/photo-1715081406782-d605bd2d39a8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TmludGVuZG8lMjBTd2l0Y2glMjBPTEVEfGVufDB8fDB8fHww",
                        gaming
                ));

                // --- Audio ---
                productRepository.save(new Product(
                        "Sony WH-1000XM5",
                        "Industry-leading noise canceling headphones with crystal clear hands-free calling.",
                        new BigDecimal("398.00"),
                        60,
                        "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1976&auto=format&fit=crop",
                        audio
                ));

                productRepository.save(new Product(
                        "Apple AirPods Max",
                        "High-fidelity audio. Active Noise Cancellation with Transparency mode.",
                        new BigDecimal("549.00"),
                        30,
                        "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?q=80&w=2070&auto=format&fit=crop",
                        audio
                ));

                productRepository.save(new Product(
                        "JBL Flip 6",
                        "Bold sound for every adventure. Waterproof and dustproof.",
                        new BigDecimal("129.00"),
                        80,
                        "https://images.unsplash.com/photo-1612444530582-fc66183b16f7?q=80&w=2070&auto=format&fit=crop",
                        audio
                ));

                productRepository.save(new Product(
                        "RCF NXL 24-A MK2 Active 2-Way Speaker Column",
                        "Delivering up to 132 dB SPL with a 2100 W Class‑D amplifier, this active 2‑way column speaker blends four 6″ neodymium woofers with a high‑precision 3″ titanium compression driver to deliver clean, punchy bass and clear highs.",
                        new BigDecimal("4000.00"),
                        2,
                        "https://images.openai.com/static-rsc-1/1pg1YElbXTCfGFHLENVTZoPlDXEpmCSqADclqY9J2ly98aQA70mYmJCIYpGAI-vobo2xjz6Guitmm82FIs2hnWGY4PKDEd2QrcfwaaRsF2jlLEXBFGhQ9sIB8_WCtVQY0jq_6feS7L05pHLU9C63ZZin3CCSM3mKcxjabYyahey10sOUVUyIaQJJA-DO_Gj9nXFIAKzfxCgQ3_4kzRihAA",
                        audio
                ));

                // --- Wearables ---
                productRepository.save(new Product(
                        "Apple Watch Ultra 2",
                        "The most rugged and capable Apple Watch ever. 36 hours of battery life.",
                        new BigDecimal("799.00"),
                        22,
                        "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2072&auto=format&fit=crop",
                        wearables
                ));

                productRepository.save(new Product(
                        "Samsung Galaxy Watch 6",
                        "Start your everyday wellness journey. Sleep tracking and heart monitoring.",
                        new BigDecimal("299.00"),
                        40,
                        "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=1827&auto=format&fit=crop",
                        wearables
                ));

                // --- Cameras ---
                productRepository.save(new Product(
                        "DJI Mini 4 Pro",
                        "Mini to the Max. 4K/60fps HDR True Vertical Shooting.",
                        new BigDecimal("759.00"),
                        18,
                        "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=2070&auto=format&fit=crop",
                        cameras
                ));

                productRepository.save(new Product(
                        "Sony Alpha a7 IV",
                        "The basic has never been this good. 33MP full-frame sensor.",
                        new BigDecimal("2498.00"),
                        5,
                        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop",
                        cameras
                ));

                productRepository.save(new Product(
                        "Fujifilm X100VI",
                        "The one and only. A compact digital camera with film simulation modes.",
                        new BigDecimal("1599.00"),
                        3,
                        "https://images.unsplash.com/photo-1519183071298-a2962feb14f4?q=80&w=2070&auto=format&fit=crop",
                        cameras
                ));

                productRepository.save(new Product(
                        "GoPro HERO12 Black",
                        "Incredible image quality, even better HyperSmooth video stabilization.",
                        new BigDecimal("399.00"),
                        50,
                        "https://images.unsplash.com/photo-1628191587476-4493ebd35f39?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fEdvUHJvJTIwSEVST3xlbnwwfHwwfHx8MA%3D%3D",
                        cameras
                ));

                System.out.println("SUCCESS: All products seeded!");
            } else {
                System.out.println("INFO: Products already exist. Skipping seed.");
            }

            // Create Admin User
            if (userRepository.findByEmail("admin@techshop.com").isEmpty()) {
                User admin = new User(
                        "admin@techshop.com",
                        passwordEncoder.encode("admin123"),
                        "Super",
                        "Admin",
                        "ADMIN"
                );
                userRepository.save(admin);
                System.out.println("SUCCESS: Admin user created.");
            } else {
                System.out.println("INFO: Admin user already exists.");
            }
        };
    }
}