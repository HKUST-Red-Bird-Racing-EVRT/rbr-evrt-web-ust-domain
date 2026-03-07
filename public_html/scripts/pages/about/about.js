class AboutSection {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    init() {
        this.render();
    }

    render() {
        if (!this.container) return;

        this.container.innerHTML = `
            <div class="container">
                <div class="about__content">
                    <div class="about__text">
                        <h2>The Journey of Red Bird Racing: From Concept to Championship</h2>
                        <p>Red Bird Racing (EVRT) began as an innovative project in 2017, driven by a passion for engineering and motorsport. Over the years, it has evolved into the official student racing team of HKUST, competing in prestigious Formula Student events. Our mission is to cultivate the skills of future engineers while pushing the boundaries of automotive technology.</p>
                    </div>
                    <div class="about__video">
                        <div class="video-wrapper">
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/jQWMarzjAxI?si=zk5wPIIjEY7ClZIx" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
} 