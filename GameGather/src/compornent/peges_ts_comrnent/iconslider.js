class IconSlider {
    // DOM要素
    slider;
    wrapper;
    icons;
    // 状態管理
    isDown = false;
    startX = 0;
    currentTranslateX = 0;
    startTranslateX = 0;
    currentIndex = 0;
    iconWidth = 0;
    constructor(selector) {
        const sliderElement = document.querySelector(selector);
        if (!sliderElement) {
            console.error(`スライダー要素 "${selector}" が見つかりませんでした。`);
            return;
        }
        this.slider = sliderElement;
        const wrapperElement = this.slider.querySelector('.icons_wrapper');
        if (!wrapperElement) {
            console.error('ラッパー要素 ".icons_wrapper" が見つかりませんでした。');
            return;
        }
        this.wrapper = wrapperElement;
        this.icons = this.wrapper.querySelectorAll('.icons');
        if (this.icons.length === 0)
            return;
        this.initialize();
    }
    initialize() {
        // アイコンの幅とギャップを取得して、1つのアイコンが進む距離を計算
        const iconStyle = window.getComputedStyle(this.icons[0]);
        const iconMargin = parseFloat(iconStyle.marginRight) + parseFloat(iconStyle.marginLeft);
        const wrapperGap = parseFloat(window.getComputedStyle(this.wrapper).gap) || 0;
        this.iconWidth = this.icons[0].offsetWidth + iconMargin + wrapperGap;
        this.addEventListeners();
        this.goToSlide(0, 'auto'); // 初期表示
    }
    addEventListeners() {
        this.slider.addEventListener('mousedown', this.handleMouseDown);
        this.slider.addEventListener('mouseleave', this.handleMouseLeave);
        this.slider.addEventListener('mouseup', this.handleMouseUp);
        this.slider.addEventListener('mousemove', this.handleMouseMove);
        this.icons.forEach((icon, index) => {
            icon.addEventListener('click', () => {
                this.goToSlide(index, 'smooth');
            });
        });
    }
    handleMouseDown = (e) => {
        this.isDown = true;
        this.slider.classList.add('active');
        this.startX = e.pageX;
        this.startTranslateX = this.currentTranslateX;
        this.wrapper.style.transition = 'none'; // ドラッグ中はアニメーションを無効化
    };
    handleMouseMove = (e) => {
        if (!this.isDown)
            return;
        e.preventDefault();
        const moveX = e.pageX - this.startX;
        this.currentTranslateX = this.startTranslateX + moveX;
        this.wrapper.style.transform = `translateX(${this.currentTranslateX}px)`;
    };
    handleMouseUp = () => {
        if (!this.isDown)
            return;
        this.isDown = false;
        this.slider.classList.remove('active');
        this.wrapper.style.transition = 'transform 0.4s ease'; // アニメーションを再度有効化
        // ドラッグ終了後、最も近いアイコンにスナップさせる
        const newIndex = Math.round(-this.currentTranslateX / this.iconWidth);
        // インデックスが範囲外にならないように調整
        const boundedIndex = Math.max(0, Math.min(this.icons.length - 1, newIndex));
        this.goToSlide(boundedIndex, 'smooth');
    };
    handleMouseLeave = () => {
        if (!this.isDown)
            return;
        this.handleMouseUp(); // コンテナ外に出たらドラッグ終了と同じ処理
    };
    /**
     * 指定されたインデックスのアイコンが中央に来るようにスライダーを移動させる
     * @param index - 中央に表示したいアイコンのインデックス
     * @param behavior - 'smooth' | 'auto' アニメーションの有無
     */
    goToSlide(index, behavior) {
        // スライダーの中心からアイコンのオフセットを引いて移動量を計算
        const sliderCenter = this.slider.clientWidth / 2;
        const iconCenter = this.icons[index].clientWidth / 2;
        const targetTranslateX = sliderCenter - (this.icons[index].offsetLeft + iconCenter);
        this.wrapper.style.transition = behavior === 'smooth' ? 'transform 0.4s ease' : 'none';
        this.wrapper.style.transform = `translateX(${targetTranslateX}px)`;
        this.currentTranslateX = targetTranslateX;
        this.currentIndex = index;
        this.updateClasses();
    }
    /**
     * アイコンのクラス（.selectedなど）を更新する
     */
    updateClasses() {
        this.icons.forEach((icon, index) => {
            if (index === this.currentIndex) {
                icon.classList.add('selected');
            }
            else {
                icon.classList.remove('selected');
            }
        });
    }
}
document.addEventListener('DOMContentLoaded', () => {
    new IconSlider('.icons_slider');
});
export {};
