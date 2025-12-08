// GitHub Stats Dashboard - Enhanced Animation and Live Repository Features

class GitHubStatsDashboard {
    constructor() {
        this.repoData = [];
        this.stats = {
            totalStars: 0,
            totalRepos: 0,
            followers: 0,
            following: 0,
            commits: 0,
            issuesOpened: 0,
            issuesClosed: 0,
            prs: 0
        };
        this.init();
    }

    init() {
        this.loadSampleData();
        this.setupEventListeners();
        this.startLiveUpdates();
        this.animateDashboard();
    }

    loadSampleData() {
        // Sample repository data
        this.repoData = [
            {
                name: "react-portfolio",
                description: "A modern portfolio website built with React and Tailwind CSS",
                stars: 128,
                forks: 42,
                issues: 5,
                language: "JavaScript",
                color: "#f34f29",
                updated: "2023-10-15",
                size: "2.4 MB"
            },
            {
                name: "node-api-server",
                description: "RESTful API server built with Node.js and Express",
                stars: 89,
                forks: 27,
                issues: 3,
                language: "JavaScript",
                color: "#f34f29",
                updated: "2023-10-12",
                size: "1.8 MB"
            },
            {
                name: "python-data-analysis",
                description: "Data analysis tools and scripts using Python and pandas",
                stars: 64,
                forks: 19,
                issues: 2,
                language: "Python",
                color: "#3572A5",
                updated: "2023-10-10",
                size: "3.1 MB"
            },
            {
                name: "mobile-app-template",
                description: "Cross-platform mobile app template using React Native",
                stars: 201,
                forks: 87,
                issues: 8,
                language: "TypeScript",
                color: "#2b7489",
                updated: "2023-10-08",
                size: "5.2 MB"
            },
            {
                name: "design-system",
                description: "Comprehensive design system with components and guidelines",
                stars: 156,
                forks: 54,
                issues: 1,
                language: "CSS",
                color: "#5a67d8",
                updated: "2023-10-05",
                size: "4.7 MB"
            },
            {
                name: "docker-configs",
                description: "Docker configurations and deployment scripts",
                stars: 73,
                forks: 31,
                issues: 4,
                language: "Shell",
                color: "#89e051",
                updated: "2023-10-03",
                size: "0.9 MB"
            }
        ];

        // Sample stats data
        this.stats = {
            totalStars: 1248,
            totalRepos: 42,
            followers: 386,
            following: 127,
            commits: 368,
            issuesOpened: 24,
            issuesClosed: 89,
            prs: 67
        };
    }

    setupEventListeners() {
        // Add event listeners for interactive elements
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('mouseenter', this.onCardHover.bind(this));
            card.addEventListener('mouseleave', this.onCardLeave.bind(this));
        });
    }

    onCardHover(event) {
        event.target.style.transform = 'translateY(-10px) scale(1.02)';
        event.target.style.boxShadow = '0 15px 40px rgba(88, 166, 255, 0.3)';
    }

    onCardLeave(event) {
        event.target.style.transform = 'translateY(0) scale(1)';
        event.target.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    }

    animateValue(element, start, end, duration = 2000) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    animateProgressBar(barElement, targetWidth, duration = 1500) {
        let startTimestamp = null;
        const initialWidth = 0;
        
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const width = progress * (targetWidth - initialWidth) + initialWidth;
            barElement.style.width = width + '%';
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    createContributionChart() {
        const chart = document.getElementById('contribution-chart');
        chart.innerHTML = '';
        
        // Generate random contribution data
        for (let i = 0; i < 12; i++) {
            const value = Math.floor(Math.random() * 100) + 10;
            const bar = document.createElement('div');
            bar.className = 'bar';
            bar.style.height = '0%';
            bar.style.background = `linear-gradient(to top, hsl(${200 + i * 5}, 70%, 50%), hsl(${200 + i * 5}, 70%, 70%))`;
            bar.innerHTML = `<div class="bar-label">${['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}</div>`;
            
            chart.appendChild(bar);
            
            // Animate the bar after a delay
            setTimeout(() => {
                bar.style.height = `${value}%`;
            }, 300 + (i * 100));
        }
    }

    createRepoCards() {
        const repoGrid = document.getElementById('repo-grid');
        repoGrid.innerHTML = '';
        
        this.repoData.forEach((repo, index) => {
            const repoCard = document.createElement('div');
            repoCard.className = 'repo-card';
            repoCard.style.animationDelay = `${index * 0.1}s`;
            
            repoCard.innerHTML = `
                <div class="repo-header">
                    <h3 class="repo-name"><i class="fab fa-github"></i> ${repo.name}</h3>
                    <div class="repo-stars">
                        <i class="fas fa-star"></i> ${repo.stars}
                    </div>
                </div>
                <p class="repo-description">${repo.description}</p>
                <div class="repo-stats">
                    <div class="repo-stat">
                        <div class="repo-stat-value">${repo.forks}</div>
                        <div class="repo-stat-label">Forks</div>
                    </div>
                    <div class="repo-stat">
                        <div class="repo-stat-value">${repo.issues}</div>
                        <div class="repo-stat-label">Issues</div>
                    </div>
                    <div class="repo-stat">
                        <div class="repo-stat-value">${Math.floor(Math.random() * 100)}</div>
                        <div class="repo-stat-label">Commits</div>
                    </div>
                </div>
                <div class="repo-language">
                    <div class="language-dot" style="background: ${repo.color}"></div>
                    <span>${repo.language}</span>
                </div>
                <div class="repo-meta">
                    <div style="display: flex; justify-content: space-between; margin-top: 15px; font-size: 0.9rem; color: #8b949e;">
                        <span><i class="fas fa-code-branch"></i> ${repo.size}</span>
                        <span><i class="far fa-calendar"></i> ${repo.updated}</span>
                    </div>
                </div>
            `;
            
            repoGrid.appendChild(repoCard);
            
            // Show the card after a delay
            setTimeout(() => {
                repoCard.classList.add('visible');
            }, 300 + (index * 100));
        });
    }

    animateDashboard() {
        // Animate statistics
        this.animateValue(document.getElementById('total-stars'), 0, this.stats.totalStars);
        this.animateValue(document.getElementById('total-repos'), 0, this.stats.totalRepos);
        this.animateValue(document.getElementById('followers'), 0, this.stats.followers);
        this.animateValue(document.getElementById('following'), 0, this.stats.following);
        this.animateValue(document.getElementById('commits'), 0, this.stats.commits);
        this.animateValue(document.getElementById('issues-opened'), 0, this.stats.issuesOpened);
        this.animateValue(document.getElementById('issues-closed'), 0, this.stats.issuesClosed);
        this.animateValue(document.getElementById('prs'), 0, this.stats.prs);

        // Animate progress bars
        setTimeout(() => {
            this.animateProgressBar(document.getElementById('js-bar'), 35);
            this.animateProgressBar(document.getElementById('css-bar'), 20);
            this.animateProgressBar(document.getElementById('ts-bar'), 25);
            this.animateProgressBar(document.getElementById('html-bar'), 15);
            this.animateProgressBar(document.getElementById('other-bar'), 5);
        }, 500);

        // Create charts and repo cards
        setTimeout(() => {
            this.createContributionChart();
            this.createRepoCards();
        }, 1000);

        // Add scroll animation to repo cards
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.repo-card').forEach(card => {
            observer.observe(card);
        });
    }

    startLiveUpdates() {
        // Simulate live updates to stats
        setInterval(() => {
            const starsElement = document.getElementById('total-stars');
            const currentStars = parseInt(starsElement.textContent);
            this.animateValue(starsElement, currentStars, currentStars + Math.floor(Math.random() * 3), 1000);
        }, 10000);

        // Update contribution chart periodically
        setInterval(() => {
            this.createContributionChart();
        }, 30000);
    }

    // Function to simulate fetching real GitHub data (mock implementation)
    async fetchGitHubData(username = 'octocat') {
        // This would normally make an API call to GitHub
        // For now, we'll return the sample data
        console.log(`Fetching data for user: ${username}`);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        return {
            user: {
                login: username,
                name: "Octocat",
                followers: this.stats.followers,
                following: this.stats.following,
                public_repos: this.stats.totalRepos
            },
            repos: this.repoData,
            stats: this.stats
        };
    }

    // Function to update the dashboard with new data
    async updateDashboard(username) {
        try {
            const data = await this.fetchGitHubData(username);
            
            // Update stats
            this.stats = data.stats;
            this.repoData = data.repos;
            
            // Re-animate the dashboard
            this.animateDashboard();
        } catch (error) {
            console.error('Error updating dashboard:', error);
        }
    }
}

// Initialize the dashboard when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const dashboard = new GitHubStatsDashboard();
    
    // Make dashboard available globally for potential external use
    window.githubStatsDashboard = dashboard;
});

// Additional utility functions for the dashboard
const GitHubUtils = {
    // Format large numbers with abbreviations
    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    },
    
    // Get color based on language
    getLanguageColor(language) {
        const colors = {
            'JavaScript': '#f34f29',
            'TypeScript': '#2b7489',
            'Python': '#3572A5',
            'CSS': '#5a67d8',
            'HTML': '#083fa1',
            'Shell': '#89e051',
            'Java': '#f89842',
            'Go': '#00add8',
            'Rust': '#dea584',
            'Swift': '#fa7343',
            'Kotlin': '#f88909',
            'C#': '#5a25a2',
            'C++': '#004080',
            'PHP': '#777bb3',
            'Ruby': '#cc342d',
            'Dart': '#00b4ab',
            'Scala': '#c22d40',
            'R': '#198ce7'
        };
        return colors[language] || '#8b949e';
    },
    
    // Calculate contribution level based on activity
    getContributionLevel(count) {
        if (count >= 30) return 'high';
        if (count >= 15) return 'medium';
        if (count >= 5) return 'low';
        return 'none';
    }
};

// Add some extra animation effects
document.addEventListener('DOMContentLoaded', () => {
    // Add ripple effect to cards
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', function(e) {
            // Create ripple element
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            this.appendChild(ripple);
            
            // Position ripple at click location
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .card {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(88, 166, 255, 0.4);
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
    `;
    document.head.appendChild(style);
});