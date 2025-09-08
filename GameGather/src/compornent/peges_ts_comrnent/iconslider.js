var IconSlider = /** @class */ (function () {
    function IconSlider(selector) {
        var _this = this;
        // 状態管理
        this.isDown = false;
        this.startX = 0;
        this.currentTranslateX = 0;
        this.startTranslateX = 0;
        this.currentIndex = 0;
        this.iconWidth = 0;
        this.handleMouseDown = function (e) {
            _this.isDown = true;
            _this.slider.classList.add('active');
            _this.startX = e.pageX;
            _this.startTranslateX = _this.currentTranslateX;
            _this.wrapper.style.transition = 'none'; // ドラッグ中はアニメーションを無効化
        };
        this.handleMouseMove = function (e) {
            if (!_this.isDown)
                return;
            e.preventDefault();
            var moveX = e.pageX - _this.startX;
            _this.currentTranslateX = _this.startTranslateX + moveX;
            _this.wrapper.style.transform = "translateX(".concat(_this.currentTranslateX, "px)");
        };
        this.handleMouseUp = function () {
            if (!_this.isDown)
                return;
            _this.isDown = false;
            _this.slider.classList.remove('active');
            _this.wrapper.style.transition = 'transform 0.4s ease'; // アニメーションを再度有効化
            // ドラッグ終了後、最も近いアイコンにスナップさせる
            var newIndex = Math.round(-_this.currentTranslateX / _this.iconWidth);
            // インデックスが範囲外にならないように調整
            var boundedIndex = Math.max(0, Math.min(_this.icons.length - 1, newIndex));
            _this.goToSlide(boundedIndex, 'smooth');
        };
        this.handleMouseLeave = function () {
            if (!_this.isDown)
                return;
            _this.handleMouseUp(); // コンテナ外に出たらドラッグ終了と同じ処理
        };
        var sliderElement = document.querySelector(selector);
        if (!sliderElement) {
            console.error("\u30B9\u30E9\u30A4\u30C0\u30FC\u8981\u7D20 \"".concat(selector, "\" \u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F\u3002"));
            return;
        }
        this.slider = sliderElement;
        var wrapperElement = this.slider.querySelector('.icons_wrapper');
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
    IconSlider.prototype.initialize = function () {
        // アイコンの幅とギャップを取得して、1つのアイコンが進む距離を計算
        var iconStyle = window.getComputedStyle(this.icons[0]);
        var iconMargin = parseFloat(iconStyle.marginRight) + parseFloat(iconStyle.marginLeft);
        var wrapperGap = parseFloat(window.getComputedStyle(this.wrapper).gap) || 0;
        this.iconWidth = this.icons[0].offsetWidth + iconMargin + wrapperGap;
        this.addEventListeners();
        this.goToSlide(0, 'auto'); // 初期表示
    };
    IconSlider.prototype.addEventListeners = function () {
        var _this = this;
        this.slider.addEventListener('mousedown', this.handleMouseDown);
        this.slider.addEventListener('mouseleave', this.handleMouseLeave);
        this.slider.addEventListener('mouseup', this.handleMouseUp);
        this.slider.addEventListener('mousemove', this.handleMouseMove);
        this.icons.forEach(function (icon, index) {
            icon.addEventListener('click', function () {
                _this.goToSlide(index, 'smooth');
            });
        });
    };
    /**
     * 指定されたインデックスのアイコンが中央に来るようにスライダーを移動させる
     * @param index - 中央に表示したいアイコンのインデックス
     * @param behavior - 'smooth' | 'auto' アニメーションの有無
     */
    IconSlider.prototype.goToSlide = function (index, behavior) {
        // スライダーの中心からアイコンのオフセットを引いて移動量を計算
        var sliderCenter = this.slider.clientWidth / 2;
        var iconCenter = this.icons[index].clientWidth / 2;
        var targetTranslateX = sliderCenter - (this.icons[index].offsetLeft + iconCenter);
        this.wrapper.style.transition = behavior === 'smooth' ? 'transform 0.4s ease' : 'none';
        this.wrapper.style.transform = "translateX(".concat(targetTranslateX, "px)");
        this.currentTranslateX = targetTranslateX;
        this.currentIndex = index;
        this.updateClasses();
    };
    /**
     * アイコンのクラス（.selectedなど）を更新する
     */
    IconSlider.prototype.updateClasses = function () {
        var _this = this;
        this.icons.forEach(function (icon, index) {
            if (index === _this.currentIndex) {
                icon.classList.add('selected');
            }
            else {
                icon.classList.remove('selected');
            }
        });
    };
    return IconSlider;
}());
document.addEventListener('DOMContentLoaded', function () {
    new IconSlider('.icons_slider');
});
