// Particle Background with p5.js
let particles = [];
let particleCount = 50;

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('particle-container');
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function draw() {
    clear();
    
    // Update and display particles
    for (let particle of particles) {
        particle.update();
        particle.display();
        particle.connect(particles);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

class Particle {
    constructor() {
        this.x = random(width);
        this.y = random(height);
        this.vx = random(-0.5, 0.5);
        this.vy = random(-0.5, 0.5);
        this.size = random(2, 4);
        this.opacity = random(0.1, 0.3);
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        
        // Wrap around edges
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
    }
    
    display() {
        noStroke();
        fill(255, 255, 255, this.opacity * 255);
        ellipse(this.x, this.y, this.size);
    }
    
    connect(particles) {
        for (let other of particles) {
            let distance = dist(this.x, this.y, other.x, other.y);
            if (distance < 100) {
                stroke(255, 255, 255, (1 - distance/100) * 50);
                strokeWeight(0.5);
                line(this.x, this.y, other.x, other.y);
            }
        }
    }
}

// Typing Effect
document.addEventListener('DOMContentLoaded', function() {
    const typedText = document.getElementById('typed-text');
    const text = 'Diseñador UX/UI';
    let index = 0;
    
    function typeWriter() {
        if (index < text.length) {
            typedText.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        } else {
            // Remove typing cursor after completion
            setTimeout(() => {
                typedText.classList.remove('typing-effect');
            }, 2000);
        }
    }
    
    // Start typing effect after a delay
    setTimeout(typeWriter, 500);
    
    // Smooth scrolling for navigation links
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
    
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-bar');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 200);
            }
        });
    }, observerOptions);
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
    
    // Animate cards on scroll
    const cards = document.querySelectorAll('.card-hover');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease-out';
        cardObserver.observe(card);
    });
    
    // Initialize skills chart
    initSkillsChart();
    
    // Navbar blur effect on scroll
    const navbar = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('nav-blur');
        } else {
            navbar.classList.remove('nav-blur');
        }
    });
    
    // Add click handlers for project buttons
    document.querySelectorAll('.card-hover button').forEach(button => {
        button.addEventListener('click', function() {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Skills Chart with ECharts
function initSkillsChart() {
    const chartDom = document.getElementById('skills-chart');
    if (!chartDom) return;
    
    const myChart = echarts.init(chartDom);
    
    const option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c}%'
        },
        radar: {
            indicator: [
                { name: 'Research', max: 100 },
                { name: 'UI Design', max: 100 },
                { name: 'Prototyping', max: 100 },
                { name: 'User Testing', max: 100 },
                { name: 'Design Systems', max: 100 },
                { name: 'Interaction Design', max: 100 }
            ],
            shape: 'polygon',
            splitNumber: 4,
            axisName: {
                color: '#666',
                fontSize: 12
            },
            splitLine: {
                lineStyle: {
                    color: '#ddd'
                }
            },
            splitArea: {
                show: false
            }
        },
        series: [{
            name: 'Habilidades',
            type: 'radar',
            data: [{
                value: [90, 95, 88, 85, 92, 87],
                name: 'Nivel de Habilidad',
                areaStyle: {
                    color: 'rgba(37, 99, 235, 0.2)'
                },
                lineStyle: {
                    color: '#2563EB',
                    width: 2
                },
                itemStyle: {
                    color: '#2563EB'
                }
            }],
            animationDuration: 2000,
            animationEasing: 'cubicOut'
        }]
    };
    
    myChart.setOption(option);
    
    // Responsive chart
    window.addEventListener('resize', () => {
        myChart.resize();
    });
}

// Add ripple effect CSS
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .card-hover {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Smooth page transitions
function navigateToPage(url) {
    document.body.style.opacity = '0';
    setTimeout(() => {
        window.location.href = url;
    }, 300);
}

// Add page transition styles
document.body.style.transition = 'opacity 0.3s ease-in-out';

// Initialize page
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Add hover effects for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Button hover effects
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Navigation hover effects
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-1px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});