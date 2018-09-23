; (function () {
    let timer = -1
    class Slider {

        constructor({ el, interval = 2, sliderWidth = 375, autoplay = true, sliders = [] }) {
            this.$el = el
            this.$sliderWidth = sliderWidth
            this.interval = interval
            this.sliders = sliders
            this.length = sliders.length
            this.autoplay = autoplay
            this.enableAutoPlay = false
            this.currnetIndex = 0
            this.prevIndex=0
            this.imgs;
            this.dots;
        }

        init() {
            this.render()
            this._bindEvent()
            if (this.autoplay) {
                this.start()
            }
        }
        start() {
            if (this.enableAutoPlay == true) return;
            this.enableAutoPlay = true;
            this._startSlider()
        }
        end() {
            if (this.enableAutoPlay == false) return;
            this.enableAutoPlay = false;
            this._endSlider()
        }
        render() {
            this.$el.innerHTML = `<div class="ui-slider-group" ></div>
                                  <p class="ui-slider-dots"></p> `
            this.$sliderGroup = this.$el.firstElementChild
            this.$sliderDots = this.$el.lastElementChild
            this._sliderGroupGenerator(this.$sliderGroup)
            this._sliderDotsGenerator(this.$sliderDots)
            this.imgs = Array.from(this.$sliderGroup.querySelectorAll('div>a>img'))
            this.imgs.forEach(element => {
                element.setAttribute('width', this.$sliderWidth)
            });
            this.dots = Array.from(this.$sliderDots.querySelectorAll('b'))
            this.dots[this.currnetIndex].classList.add('ui-state-active')
        }

        next() {

            this.currnetIndex ++
            if( this.currnetIndex> this.length - 1){
                this.currnetIndex = 0
            }
            this.$sliderGroup.style.transform = `translateX(${-this.$sliderWidth*this.currnetIndex}px)`
            this.dots[this.currnetIndex].classList.add('ui-state-active')
            this.dots[this.prevIndex].classList.remove('ui-state-active')
            this.prevIndex = this.currnetIndex
        }
        _sliderGroupGenerator(el) {

            el.style.width = `${this.$sliderWidth * this.length}px`
            el.innerHTML = this.sliders.map((slider, index) => {
                return ` <div class="ui-slider-item">
                    <a href="${slider.link}">
                        <img src="${slider.img}" alt="slider_${index + 1}">
                    </a>
                </div>`
            }).join('')
        }

        _sliderDotsGenerator(el) {
            let dots = []
            for (let i = 0; i < this.length; i++) {
                dots.push('<b></b>')
            }
            el.innerHTML = dots.join('')
        }

        _bindEvent() {

            document.addEventListener('visibilitychange', function () {
                if (!this.enableAutoPlay) return;
                if (document.hidden) {
                    this._endSlider()
                } else {
                    this._startSlider()
                }
            })

            this.$el.addEventListener('touchstart', function () {
                if (!this.enableAutoPlay) return;
                this._endSlider()

            }.bind(this))

            this.$el.addEventListener('touchend', function () {
                if (!this.enableAutoPlay) return;
                this._startSlider()
            }.bind(this))

        }

        _startSlider() {
            timer = setInterval(this.next.bind(this), this.interval * 1000)
        }

        _endSlider() {
            clearInterval(timer)
        }
    }

    window.Slider = Slider
})()
