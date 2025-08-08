document.addEventListener('DOMContentLoaded', () => {

    // --- LOADING ANIMATION --- //
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 2000);
    }

    // --- HEADER SCROLL EFFECT --- //
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- THEME SWITCHER --- //
    const themeCheckbox = document.getElementById('theme-checkbox');
    const currentTheme = localStorage.getItem('theme') || 'dark';

    document.body.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'light') {
        themeCheckbox.checked = true;
    }

    if (themeCheckbox) {
        themeCheckbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                document.body.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            } else {
                document.body.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // --- TYPING ANIMATION --- //
    if (typeof Typed !== 'undefined') {
        new Typed('.typing', {
            strings: ['Develop Android Apps.', 'Build Mobile Solutions.', 'Create User Experiences.', 'Code in Kotlin.'],
            typeSpeed: 70,
            backSpeed: 60,
            loop: true
        });
    }

    // --- MOBILE MENU --- //
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // --- ACTIVE LINK ON SCROLL --- //
    const sections = document.querySelectorAll('main section');
    const navLi = document.querySelectorAll('nav .nav-links li a');
    window.addEventListener('scroll', () => {
        let current = 'hero';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 85) {
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });

    // --- FADE-IN ANIMATION ON SCROLL --- //
    const faders = document.querySelectorAll('.fade-in');
    if (window.IntersectionObserver) {
        const appearOptions = {
            threshold: 0.2,
            rootMargin: "0px 0px -100px 0px"
        };
        const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('visible');
                appearOnScroll.unobserve(entry.target);
            });
        }, appearOptions);
        faders.forEach(fader => {
            appearOnScroll.observe(fader);
        });
    }

    // --- SKILL BARS ANIMATION --- //
    const skillBars = document.querySelectorAll('.skill-bar');
    if (skillBars.length > 0) {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target.querySelector('.progress');
                    const width = progressBar.getAttribute('data-width');
                    progressBar.style.width = width + '%';
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => {
            skillObserver.observe(bar);
        });
    }

    // --- PROJECT FILTERING --- //
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    if (filterBtns.length > 0 && projectCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.dataset.filter;

                projectCards.forEach(card => {
                    card.style.transition = 'all 0.4s ease';
                    if (filter === 'all' || card.dataset.category === filter) {
                        card.style.transform = 'scale(1)';
                        card.style.opacity = '1';
                        setTimeout(() => { card.style.display = 'block'; }, 400);
                    } else {
                        card.style.transform = 'scale(0.8)';
                        card.style.opacity = '0';
                        setTimeout(() => { card.style.display = 'none'; }, 400);
                    }
                });
            });
        });
    }

    // --- PROJECT MODAL --- //
    const projectModal = document.getElementById('project-modal');
    const viewProjectBtns = document.querySelectorAll('.view-project-btn');
    const closeModal = document.querySelector('.close-modal');

    // Project data
    const projectData = {
        project1: {
            title: 'AutoLog',
            description: 'An Android application that enables vehicle owners to track fuel, maintenance, and other expenses. Features include expense tracking, maintenance reminders, fuel consumption analysis, and PDF report generation.',
            image: 'images/project1.png',
            tech: ['Kotlin', 'Firebase', 'WorkManager', 'iText PDF', 'Room Database'],
            demo: '#',
            code: '#'
        },
        project2: {
            title: 'Word Game',
            description: 'A gamified mobile app that facilitates learning English vocabulary in an engaging way. Features include word quizzes, progress tracking, offline mode, and ad integration.',
            image: 'images/project2.png',
            tech: ['Kotlin', 'Room', 'Google ML Kit', 'AdMob', 'MVVM'],
            demo: '#',
            code: '#'
        },
        project3: {
            title: 'To-Minder',
            description: 'A productivity app that combines tasks, reminders, and team chat in one place. Features include task management, team collaboration, push notifications, and Google Sign-In.',
            image: 'images/project1.png',
            tech: ['Kotlin', 'MVVM', 'Firebase', 'Google Sign-In', 'AlarmManager'],
            demo: '#',
            code: '#'
        }
    };

    viewProjectBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = btn.getAttribute('data-project');
            const project = projectData[projectId];
            
            if (project) {
                document.getElementById('modal-image').src = project.image;
                document.getElementById('modal-title').textContent = project.title;
                document.getElementById('modal-description').textContent = project.description;
                
                const modalTech = document.getElementById('modal-tech');
                modalTech.innerHTML = '';
                project.tech.forEach(tech => {
                    const span = document.createElement('span');
                    span.textContent = tech;
                    modalTech.appendChild(span);
                });
                
                document.getElementById('modal-demo').href = project.demo;
                document.getElementById('modal-code').href = project.code;
                
                projectModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            projectModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            projectModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // --- DOWNLOAD CV FUNCTIONALITY --- //
    const downloadCvBtn = document.getElementById('download-cv');
    if (downloadCvBtn) {
        downloadCvBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Try to download PDF first, if fails show modal
            try {
                const cvLink = document.createElement('a');
                cvLink.href = 'cv/cv.pdf';
                cvLink.download = 'Cihan_Kocakusak_CV.pdf';
                cvLink.style.display = 'none';
                
                document.body.appendChild(cvLink);
                cvLink.click();
                document.body.removeChild(cvLink);
                
                console.log('CV PDF download initiated');
            } catch (error) {
                console.error('PDF download failed, showing modal:', error);
                showCVModal();
            }
        });
    }

    // CV Modal functionality
    function showCVModal() {
        // Create modal HTML
        const modalHTML = `
            <div class="cv-modal" id="cv-modal">
                <div class="cv-modal-content">
                    <span class="close-cv-modal">&times;</span>
                    <div class="cv-content">
                        <h2>Cihan Kocakuşak - Android Developer</h2>
                        
                        <div class="cv-section">
                            <h3>📞 İletişim</h3>
                            <p><strong>Telefon:</strong> 05074316888</p>
                            <p><strong>Email:</strong> cihankocakusak3@gmail.com</p>
                            <p><strong>Konum:</strong> Ankara, Pursaklar</p>
                        </div>

                        <div class="cv-section">
                            <h3>👨‍💻 Hakkımda</h3>
                            <p>Android Developer olarak backend becerilerine sahibim. Android Studio ile çalışıyorum ve MVVM gibi modern pattern'leri kullanıyorum. Room database, Firebase (Auth, Firestore, Storage), Navigation Component ve Retrofit gibi araçları kullanarak kullanıcı dostu uygulamalar geliştiriyorum. Mobil geliştirmenin yanı sıra Java ve Spring Boot kullanarak backend geliştirme konusunda temel bilgilere sahibim.</p>
                        </div>

                        <div class="cv-section">
                            <h3>🎓 Eğitim</h3>
                            <p><strong>Cumhuriyet Üniversitesi</strong></p>
                            <p>Bilgisayar Mühendisliği Lisans Derecesi</p>
                            <p>📅 02.09.2020 - 17.01.2025</p>
                        </div>

                        <div class="cv-section">
                            <h3>💼 İş Deneyimi</h3>
                            <p><strong>Cypoint Bilişim Teknolojileri A.Ş.</strong></p>
                            <p>Stajyer</p>
                            <p>📅 26.08.2024 - 24.09.2024</p>
                            
                            <p><strong>Boğaziçi Savunma Teknolojileri A.Ş.</strong></p>
                            <p>Stajyer</p>
                            <p>📅 16.07.2024 - 16.08.2024</p>
                        </div>

                        <div class="cv-section">
                            <h3>🚀 Projeler</h3>
                            <p><strong>AutoLog</strong></p>
                            <p>Araç sahiplerinin yakıt, bakım ve diğer masrafları takip etmelerini sağlayan Android uygulaması.</p>
                            <p>🛠️ Teknolojiler: Kotlin, Firebase, WorkManager, iText PDF</p>
                            
                            <p><strong>Word Game</strong></p>
                            <p>İngilizce kelime öğrenmeyi eğlenceli bir şekilde kolaylaştıran oyunlaştırılmış mobil uygulama.</p>
                            <p>🛠️ Teknolojiler: Kotlin, Room, Google ML Kit, AdMob</p>
                            
                            <p><strong>To-Minder</strong></p>
                            <p>Görevleri, hatırlatıcıları ve takım sohbetini tek yerde birleştiren üretkenlik uygulaması.</p>
                            <p>🛠️ Teknolojiler: Kotlin, MVVM, Firebase, Google Sign-In, AlarmManager</p>
                        </div>

                        <div class="cv-section">
                            <h3>📱 Portföy</h3>
                            <p>Google Play Developer</p>
                            <p>GitHub</p>
                        </div>

                        <div class="cv-section">
                            <h3>🌍 Diller</h3>
                            <p>İngilizce — B1 (Orta)</p>
                        </div>

                        <div class="cv-actions">
                            <button onclick="downloadCVText()" class="cv-download-btn">
                                <i class="fas fa-download"></i> CV'yi İndir (TXT)
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add modal to page
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Show modal
        const modal = document.getElementById('cv-modal');
        modal.style.display = 'block';

        // Close modal functionality
        const closeBtn = document.querySelector('.close-cv-modal');
        closeBtn.onclick = function() {
            modal.style.display = 'none';
            document.body.removeChild(modal);
        }

        // Close when clicking outside
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
                document.body.removeChild(modal);
            }
        }
    }

    // Download CV as text file
    window.downloadCVText = function() {
        const cvContent = `Cihan Kocakuşak - Android Developer

📞 05074316888
📧 cihankocakusak3@gmail.com
📍 Ankara, Pursaklar

ABOUT ME
I am an Android Developer with backend skills. I work with Android Studio and use modern patterns like MVVM. I also use tools like Room database, Firebase (Auth, Firestore, Storage), Navigation Component, and Retrofit to build user-friendly apps. Besides mobile development, I have foundational knowledge of backend development using Java and Spring Boot. I am familiar with building RESTful services and working with databases to connect my apps with servers. Additionally, I use tools like Git, Firebase, and SQLite for data management and version control. I am hardworking, responsible, and eager to continuously improve and learn new technologies.

EDUCATION
Cumhuriyet University
Bachelor's Degree in Computer Engineering
📅 02.09.2020 - 17.01.2025

WORK EXPERIENCE
Cypoint Bilişim Teknolojileri A.Ş.
Intern
📅 26.08.2024 - 24.09.2024

Boğaziçi Savunma Teknolojileri A.Ş.
Intern
📅 16.07.2024 - 16.08.2024

PROJECTS
AutoLog
An Android application that enables vehicle owners to track fuel, maintenance, and other expenses.
🛠️ Technologies: Kotlin, Firebase, WorkManager, iText PDF

Word Game
A gamified mobile app that facilitates learning English vocabulary in an engaging way.
🛠️ Technologies: Kotlin, Room, Google ML Kit, AdMob

To-Minder
A productivity app that combines tasks, reminders, and team chat in one place.
🛠️ Technologies: Kotlin, MVVM, Firebase, Google Sign-In, AlarmManager

PORTFOLIO
Google Play Developer
GitHub

LANGUAGES
English — B1 (Intermediate)`;

        const blob = new Blob([cvContent], { type: 'text/plain;charset=utf-8' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Cihan_Kocakusak_CV.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }

    // --- BACK TO TOP BUTTON --- //
    const backToTopBtn = document.querySelector('.back-to-top-btn');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.remove('hidden');
            } else {
                backToTopBtn.classList.add('hidden');
            }
        });

        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- ENHANCED CONTACT FORM VALIDATION --- //
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.elements.name.value.trim();
            const email = this.elements.email.value.trim();
            const subject = this.elements.subject.value.trim();
            const message = this.elements.message.value.trim();
            
            // Validation
            let isValid = true;
            let errorMessage = '';
            
            if (!name) {
                errorMessage += 'Name is required.\n';
                isValid = false;
            }
            
            if (!email) {
                errorMessage += 'Email is required.\n';
                isValid = false;
            } else if (!isValidEmail(email)) {
                errorMessage += 'Please enter a valid email address.\n';
                isValid = false;
            }
            
            if (!subject) {
                errorMessage += 'Subject is required.\n';
                isValid = false;
            }
            
            if (!message) {
                errorMessage += 'Message is required.\n';
                isValid = false;
            }
            
            if (isValid) {
                // Simulate form submission
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    alert('Thank you for your message! I will get back to you soon.');
                    this.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            } else {
                alert('Please correct the following errors:\n' + errorMessage);
            }
        });
    }

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // --- PARALLAX EFFECT FOR HERO SECTION --- //
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroBackground.style.transform = `translateY(${rate}px)`;
        });
    }

    // --- SMOOTH SCROLL FOR ALL ANCHOR LINKS --- //
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- ADD HOVER EFFECTS TO SOCIAL LINKS --- //
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // --- ADD CLICK EFFECTS TO BUTTONS --- //
    const buttons = document.querySelectorAll('.cta-button, .filter-btn, .view-project-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // --- ADD TYPING SOUND EFFECT (OPTIONAL) --- //
    const typingElement = document.querySelector('.typing');
    if (typingElement) {
        // You can add typing sound effects here if desired
        // const typingSound = new Audio('path/to/typing-sound.mp3');
        // typingSound.volume = 0.1;
    }

    // --- CHATBOT FUNCTIONALITY --- //
    const chatBubble = document.getElementById('chat-bubble');
    const chatWindow = document.getElementById('chat-window');
    const closeChat = document.getElementById('close-chat');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendMessage = document.getElementById('send-message');

    // Chatbot state
    let isChatOpen = false;
    let isTyping = false;

    // Google AI API Configuration (Gemini 1.5 Flash)
    const GOOGLE_API_KEY = 'AIzaSyCgsE5fOghu6629MNx-jIafC4q2Q1azIws'; // Replace with your actual API key
    const GOOGLE_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';
    
    // Alternative proxy URLs for CORS issues
    const PROXY_URLS = [
        'https://corsproxy.io/?',
        'https://api.allorigins.win/raw?url=',
        'https://cors-anywhere.herokuapp.com/',
        'https://cors.bridged.cc/',
        'https://thingproxy.freeboard.io/fetch/',
        'https://api.codetabs.com/v1/proxy/?quest='
    ];
    const USE_PROXY = true; // Set to true if you have CORS issues
    let currentProxyIndex = 0;
    let lastSuccessfulProxyIndex = null; // Track the last successful proxy

    // Test API connection
    async function testAPIConnection() {
        try {
            console.log('Testing API connection...');
            
            // Try direct connection first
            if (!USE_PROXY) {
                const directUrl = `${GOOGLE_API_URL}?key=${GOOGLE_API_KEY}`;
                const directResponse = await tryFetch(directUrl, false);
                if (directResponse && directResponse.ok) {
                    console.log('✅ Direct API connection successful!');
                    return true;
                }
            }
            
            // Try last successful proxy first if available
            if (lastSuccessfulProxyIndex !== null) {
                const proxyUrl = `${PROXY_URLS[lastSuccessfulProxyIndex]}${GOOGLE_API_URL}?key=${GOOGLE_API_KEY}`;
                console.log(`Trying last successful proxy: ${PROXY_URLS[lastSuccessfulProxyIndex].substring(0, 30)}...`);
                
                const proxyResponse = await tryFetch(proxyUrl, true);
                if (proxyResponse && proxyResponse.ok) {
                    console.log(`✅ API connection successful with previous proxy!`);
                    currentProxyIndex = lastSuccessfulProxyIndex;
                    return true;
                }
            }
            
            // Try each proxy in sequence
            for (let i = 0; i < PROXY_URLS.length; i++) {
                // Skip the proxy we already tried
                if (i === lastSuccessfulProxyIndex) continue;
                
                currentProxyIndex = i;
                const proxyUrl = `${PROXY_URLS[i]}${GOOGLE_API_URL}?key=${GOOGLE_API_KEY}`;
                console.log(`Trying proxy ${i+1}/${PROXY_URLS.length}: ${PROXY_URLS[i].substring(0, 30)}...`);
                
                const proxyResponse = await tryFetch(proxyUrl, true);
                if (proxyResponse && proxyResponse.ok) {
                    console.log(`✅ API connection successful with proxy ${i+1}!`);
                    lastSuccessfulProxyIndex = i;
                    return true;
                }
            }
            
            console.error('❌ All API connection attempts failed');
            return false;
        } catch (error) {
            console.error('❌ API connection error:', error);
            return false;
        }
    }
    
    // Helper function to try fetch with timeout
    async function tryFetch(url, isProxy, timeout = 8000) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => {
                controller.abort();
                console.warn(`Request to ${url.substring(0, 30)}... timed out after ${timeout}ms`);
            }, timeout);
            
            // Add retry logic
            let retries = 2;
            let response = null;
            
            while (retries >= 0 && !response) {
                try {
                    response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            ...(isProxy && { 
                                'Origin': window.location.origin,
                                'X-Requested-With': 'XMLHttpRequest'
                            })
                        },
                        body: JSON.stringify({
                            contents: [{
                                parts: [{
                                    text: "Merhaba, bu bir test mesajıdır."
                                }]
                            }]
                        }),
                        signal: controller.signal,
                        mode: 'cors',
                        cache: 'no-cache'
                    });
                } catch (fetchError) {
                    if (retries === 0) throw fetchError;
                    console.warn(`Retry attempt for ${url.substring(0, 30)}... (${retries} left)`);
                    retries--;
                    // Short delay before retry
                    await new Promise(resolve => setTimeout(resolve, 500));
                }
            }
            
            clearTimeout(timeoutId);
            
            if (response && !response.ok) {
                console.error(`Fetch failed with status: ${response.status}`);
                try {
                    const errorText = await response.text();
                    console.error('Error details:', errorText);
                } catch (textError) {
                    console.error('Could not read error response text');
                }
            }
            
            return response;
        } catch (error) {
            console.error(`Fetch error for ${url.substring(0, 30)}...:`, error.message);
            return null;
        }
    }

    // Test API on page load
    testAPIConnection();

    // Chatbot toggle
    if (chatBubble) {
        chatBubble.addEventListener('click', () => {
            toggleChat();
        });
    }

    if (closeChat) {
        closeChat.addEventListener('click', () => {
            toggleChat();
        });
    }

    function toggleChat() {
        isChatOpen = !isChatOpen;
        if (isChatOpen) {
            chatWindow.classList.add('active');
            chatInput.focus();
        } else {
            chatWindow.classList.remove('active');
        }
    }

    // Send message functionality
    if (sendMessage && chatInput) {
        sendMessage.addEventListener('click', () => {
            sendUserMessage();
        });

        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendUserMessage();
            }
        });
    }

    function sendUserMessage() {
        const message = chatInput.value.trim();
        if (!message || isTyping) return;

        // Add user message to chat
        addMessage(message, 'user');
        chatInput.value = '';

        // Show typing indicator
        showTypingIndicator();

        // Get AI response
        getAIResponse(message);
    }

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const time = new Date().toLocaleTimeString('tr-TR', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });

        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${text}</p>
            </div>
            <div class="message-time">${time}</div>
        `;

        chatMessages.appendChild(messageDiv);
        scrollToBottom();
    }

    function showTypingIndicator() {
        isTyping = true;
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.id = 'typing-indicator';
        
        typingDiv.innerHTML = `
            <div class="message-content">
                <div class="typing-dots">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;

        chatMessages.appendChild(typingDiv);
        scrollToBottom();
    }

    function hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
        isTyping = false;
    }

    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    async function getAIResponse(userMessage) {
        try {
            // Prepare the prompt for the AI
            const prompt = `You are Cihan Kocakuşak's AI assistant. Cihan is an Android Developer from Ankara, Turkey who specializes in mobile app development, Kotlin, Java, and modern Android technologies. 

            Respond to the user's message in Turkish. Be helpful, friendly, and professional. You can help with:
            - Questions about Cihan's Android projects and skills
            - Mobile development advice
            - Information about services offered
            - General questions about the portfolio

            User message: ${userMessage}

            Please provide a helpful response in Turkish.`;

            const requestBody = {
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1024,
                },
                safetySettings: [
                    {
                        category: "HARM_CATEGORY_HARASSMENT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_HATE_SPEECH",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    }
                ]
            };

            console.log('Sending request to Google AI API...');
            
            let response = null;
            let data = null;
            
            // Try direct connection if proxy is disabled
            if (!USE_PROXY) {
                const directUrl = `${GOOGLE_API_URL}?key=${GOOGLE_API_KEY}`;
                response = await tryApiRequest(directUrl, requestBody, false);
                if (response && response.ok) {
                    try {
                        data = await response.json();
                        console.log('✅ Direct API request successful');
                    } catch (jsonError) {
                        console.error('Error parsing direct API JSON response:', jsonError);
                    }
                }
            }
            
            // If direct connection failed or proxy is enabled, try proxies
            if (!data && USE_PROXY) {
                // Try last successful proxy first if available
                if (lastSuccessfulProxyIndex !== null) {
                    const proxyUrl = `${PROXY_URLS[lastSuccessfulProxyIndex]}${GOOGLE_API_URL}?key=${GOOGLE_API_KEY}`;
                    console.log(`Trying API request with last successful proxy...`);
                    
                    response = await tryApiRequest(proxyUrl, requestBody, true);
                    if (response && response.ok) {
                        try {
                            data = await response.json();
                            currentProxyIndex = lastSuccessfulProxyIndex;
                            console.log(`✅ API request successful with previous proxy`);
                        } catch (jsonError) {
                            console.error('Error parsing JSON response from previous proxy:', jsonError);
                            lastSuccessfulProxyIndex = null; // Reset if it fails
                        }
                    }
                }
                
                // If still no data, try all proxies
                if (!data) {
                    for (let i = 0; i < PROXY_URLS.length; i++) {
                        // Skip the proxy we already tried
                        if (i === lastSuccessfulProxyIndex) continue;
                        
                        const proxyUrl = `${PROXY_URLS[i]}${GOOGLE_API_URL}?key=${GOOGLE_API_KEY}`;
                        console.log(`Trying API request with proxy ${i+1}/${PROXY_URLS.length}...`);
                        
                        response = await tryApiRequest(proxyUrl, requestBody, true);
                        if (response && response.ok) {
                            try {
                                data = await response.json();
                                currentProxyIndex = i;
                                lastSuccessfulProxyIndex = i; // Remember successful proxy
                                console.log(`✅ API request successful with proxy ${i+1}`);
                                break;
                            } catch (jsonError) {
                                console.error(`Error parsing JSON response from proxy ${i+1}:`, jsonError);
                            }
                        }
                    }
                }
            }
            
            // Hide typing indicator
            hideTypingIndicator();
            
            // If we have data, process it
            if (data) {
                console.log('API Response:', data);
                
                // Extract the AI response
                let aiResponse = '';
                if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
                    aiResponse = data.candidates[0].content.parts[0].text;
                } else if (data.promptFeedback && data.promptFeedback.blockReason) {
                    aiResponse = 'Üzgünüm, mesajınız güvenlik politikaları nedeniyle engellendi. Lütfen farklı bir soru sorun.';
                } else {
                    aiResponse = 'Üzgünüm, şu anda yanıt veremiyorum. Lütfen daha sonra tekrar deneyin.';
                }
                
                // Add AI response to chat
                addMessage(aiResponse, 'bot');
            } else {
                // All API attempts failed
                throw new Error('All API connection attempts failed');
            }
        } catch (error) {
            console.error('Error getting AI response:', error);
            hideTypingIndicator();
            
            // Show a more user-friendly error message and suggest alternatives
            let errorMessage = 'Üzgünüm, şu anda API bağlantısında bir sorun yaşıyorum. Ancak size yine de yardımcı olabilirim. Cihan\'ın Android projeleri, teknolojileri veya hizmetleri hakkında soru sorabilirsiniz.';
            
            // Use fallback responses when API fails
            const fallbackResponse = getFallbackResponse(userMessage);
            if (fallbackResponse !== getFallbackResponse('default')) {
                // We found a matching fallback response
                addMessage(fallbackResponse, 'bot');
                
                // After a short delay, suggest some related topics
                setTimeout(() => {
                    const suggestions = getSuggestions(userMessage);
                    if (suggestions) {
                        addMessage(suggestions, 'bot');
                    }
                }, 1000);
            } else {
                // No specific fallback found, use generic error message
                addMessage(errorMessage, 'bot');
                
                // After a short delay, suggest some popular topics
                setTimeout(() => {
                    addMessage('Aşağıdaki konular hakkında bilgi verebilirim:\n- Android geliştirme teknolojileri\n- Cihan\'ın projeleri\n- Mobil uygulama geliştirme hizmetleri\n- İletişim bilgileri', 'bot');
                }, 1000);
            }
            
            // Schedule a retry of the API connection
            setTimeout(() => {
                testAPIConnection();
            }, 30000); // Try again after 30 seconds
        }
    }
    
    // Helper function to try API request with timeout
    async function tryApiRequest(url, requestBody, isProxy, timeout = 12000) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => {
                controller.abort();
                console.warn(`API request to ${url.substring(0, 30)}... timed out after ${timeout}ms`);
            }, timeout);
            
            // Add retry logic
            let retries = 2;
            let response = null;
            
            while (retries >= 0 && !response) {
                try {
                    response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            ...(isProxy && { 
                                'Origin': window.location.origin,
                                'X-Requested-With': 'XMLHttpRequest'
                            })
                        },
                        body: JSON.stringify(requestBody),
                        signal: controller.signal,
                        mode: 'cors',
                        cache: 'no-cache'
                    });
                } catch (fetchError) {
                    if (retries === 0) throw fetchError;
                    console.warn(`Retry attempt for API request to ${url.substring(0, 30)}... (${retries} left)`);
                    retries--;
                    // Short delay before retry
                    await new Promise(resolve => setTimeout(resolve, 800));
                }
            }
            
            clearTimeout(timeoutId);
            
            if (response) {
                console.log(`Response status for ${url.substring(0, 30)}...: ${response.status}`);
                
                if (!response.ok) {
                    try {
                        const errorText = await response.text();
                        console.error(`API Error Response (${response.status}):`, errorText);
                    } catch (textError) {
                        console.error(`Could not read error response text for status ${response.status}`);
                    }
                }
            }
            
            return response;
        } catch (error) {
            console.error(`API request error for ${url.substring(0, 30)}...:`, error.message);
            return null;
        }
    }

    // Fallback response system
    function getFallbackResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Predefined responses for common questions
        const responses = {
            'kimsin': 'Ben Cihan\'ın AI asistanıyım. Android geliştirme, projeler ve hizmetler hakkında bilgi verebilirim.',
            'sen kimsin': 'Ben Cihan\'ın AI asistanıyım. Size Android geliştirme, projeler ve hizmetler hakkında yardımcı olabilirim.',
            'proje': 'Cihan\'ın projeleri arasında AutoLog (araç takip uygulaması), Word Game (İngilizce kelime oyunu) ve To-Minder (üretkenlik uygulaması) bulunuyor. Tüm projeler modern Android teknolojileri kullanılarak geliştirilmiştir.',
            'android': 'Cihan Android geliştirme konusunda uzman. Kotlin, Java, Firebase, Room Database, MVVM pattern gibi modern teknolojileri kullanıyor.',
            'kotlin': 'Kotlin konusunda 3+ yıllık deneyime sahip. Modern Android development, Coroutines, Flow, ve Jetpack Compose kullanıyor.',
            'java': 'Java ve Spring Boot konusunda backend development deneyimi var. RESTful API geliştirme ve veritabanı entegrasyonu yapıyor.',
            'firebase': 'Firebase Authentication, Firestore, Storage, ve Cloud Functions konularında deneyimli.',
            'fiyat': 'Fiyatlandırma projenin kapsamına göre değişir. Detaylı bilgi için iletişim formunu kullanabilirsiniz.',
            'iletişim': 'Cihan\'a cihankocakusak3@gmail.com adresinden veya +90 507 431 68 88 numarasından ulaşabilirsiniz.',
            'deneyim': 'Cihan 4+ yıllık deneyime sahip bir Android geliştiricisidir. Kotlin, Java ve modern mobile teknolojilerde uzmanlaşmıştır.',
            'hizmet': 'Android uygulama geliştirme, mobil uygulama, backend development ve UI/UX tasarım hizmetleri sunuyor.',
            'room': 'Room Database ile local veritabanı yönetimi, migration, ve complex queries konularında deneyimli.',
            'mvvm': 'MVVM architecture pattern, LiveData, ViewModel, ve DataBinding konularında uzman.',
            'retrofit': 'Retrofit ile REST API entegrasyonu, network calls, ve JSON parsing konularında deneyimli.',
            'workmanager': 'WorkManager ile background tasks, scheduling, ve periodic work konularında deneyimli.',
            'git': 'Git, GitHub ile versiyon kontrolü ve collaborative development deneyimi.',
            'play store': 'Google Play Store\'da yayınlanmış uygulamalar ve store optimization deneyimi.',
            'intern': 'Cypoint Bilişim ve Boğaziçi Savunma Teknolojileri\'nde staj deneyimi var.',
            'eğitim': 'Cumhuriyet Üniversitesi Bilgisayar Mühendisliği bölümünden mezun.',
            'merhaba': 'Merhaba! Size nasıl yardımcı olabilirim? Cihan\'ın Android projeleri, teknolojileri veya hizmetleri hakkında soru sorabilirsiniz.',
            'nasılsın': 'İyiyim, teşekkür ederim! Size nasıl yardımcı olabilirim?',
            'teşekkür': 'Rica ederim! Başka bir sorunuz varsa yardımcı olmaktan mutluluk duyarım.',
            'görüşürüz': 'Görüşmek üzere! İyi günler dilerim.',
            'bye': 'Görüşmek üzere! İyi günler dilerim.',
            'selam': 'Selam! Size nasıl yardımcı olabilirim?',
            'default': 'Üzgünüm, şu anda API bağlantısında bir sorun yaşıyorum. Ancak size yine de yardımcı olabilirim. Cihan\'ın Android projeleri, teknolojileri veya hizmetleri hakkında soru sorabilirsiniz.'
        };

        // Check for exact matches first
        for (const [key, response] of Object.entries(responses)) {
            if (message.includes(key)) {
                return response;
            }
        }

        // Check for partial matches
        if (message.includes('mobil') || message.includes('app')) {
            return 'Mobil uygulama geliştirme konusunda Android Studio, Kotlin ve modern Android teknolojileri kullanıyorum.';
        }
        
        if (message.includes('uygulama') || message.includes('application')) {
            return 'Android uygulama geliştirme konusunda MVVM pattern, Room Database, Firebase ve modern Android teknolojileri kullanıyorum.';
        }
        
        if (message.includes('backend') || message.includes('api')) {
            return 'Backend geliştirme konusunda Java, Spring Boot ve REST API geliştirme deneyimim var.';
        }

        // Default response
        return responses.default;
    }
    
    // Get related topic suggestions based on user message
    function getSuggestions(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Topic categories with related keywords
        const categories = {
            'android': ['kotlin', 'java', 'android studio', 'mobile', 'uygulama', 'app', 'geliştirme', 'development'],
            'projeler': ['proje', 'project', 'autolog', 'word game', 'to-minder', 'portfolio', 'çalışma'],
            'teknolojiler': ['teknoloji', 'technology', 'firebase', 'room', 'mvvm', 'retrofit', 'jetpack', 'compose'],
            'iletişim': ['iletişim', 'contact', 'email', 'telefon', 'phone', 'mesaj', 'message'],
            'hizmetler': ['hizmet', 'service', 'fiyat', 'price', 'ücret', 'teklif', 'offer']
        };
        
        // Find matching categories
        const matchingCategories = [];
        for (const [category, keywords] of Object.entries(categories)) {
            for (const keyword of keywords) {
                if (message.includes(keyword)) {
                    matchingCategories.push(category);
                    break;
                }
            }
        }
        
        // Generate suggestions based on matching categories
        if (matchingCategories.length > 0) {
            let suggestions = 'Ayrıca şu konular hakkında da bilgi verebilirim:\n';
            
            if (matchingCategories.includes('android')) {
                suggestions += '- Kotlin ve Java deneyimi\n- Android Studio ve geliştirme ortamı\n';
            }
            
            if (matchingCategories.includes('projeler')) {
                suggestions += '- Cihan\'ın tamamlanmış projeleri\n- Proje geliştirme süreci\n';
            }
            
            if (matchingCategories.includes('teknolojiler')) {
                suggestions += '- Modern Android teknolojileri\n- Backend ve API entegrasyonu\n';
            }
            
            if (matchingCategories.includes('iletişim')) {
                suggestions += '- İletişim bilgileri\n- Sosyal medya hesapları\n';
            }
            
            if (matchingCategories.includes('hizmetler')) {
                suggestions += '- Uygulama geliştirme hizmetleri\n- Fiyatlandırma ve süreç\n';
            }
            
            return suggestions;
        }
        
        return null; // No specific suggestions
    }

    // Quick response buttons for common questions
    function addQuickResponses() {
        const quickResponses = [
            'Projeleriniz hakkında bilgi alabilir miyim?',
            'Hangi teknolojileri kullanıyorsunuz?',
            'Fiyatlandırma nasıl?',
            'İletişim bilgileriniz neler?'
        ];

        const quickResponseDiv = document.createElement('div');
        quickResponseDiv.className = 'quick-responses';
        quickResponseDiv.innerHTML = `
            <div class="quick-response-title">Hızlı sorular:</div>
            <div class="quick-response-buttons">
                ${quickResponses.map(response => `
                    <button class="quick-response-btn" onclick="sendQuickResponse('${response}')">
                        ${response}
                    </button>
                `).join('')}
            </div>
        `;

        chatMessages.appendChild(quickResponseDiv);
    }

    // Add quick response functionality to global scope
    window.sendQuickResponse = function(response) {
        addMessage(response, 'user');
        showTypingIndicator();
        
        // Simulate API delay
        setTimeout(() => {
            getAIResponse(response);
        }, 1000);
        
        // Remove quick responses after first use
        const quickResponses = document.querySelector('.quick-responses');
        if (quickResponses) {
            quickResponses.remove();
        }
    };

    // Add quick responses after initial bot message
    setTimeout(() => {
        addQuickResponses();
    }, 1000);

    // Close chat when clicking outside
    document.addEventListener('click', (e) => {
        if (isChatOpen && 
            !chatWindow.contains(e.target) && 
            !chatBubble.contains(e.target)) {
            toggleChat();
        }
    });

    console.log('Portfolio website loaded successfully! 🚀');
});