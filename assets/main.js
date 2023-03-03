// 导航实例
const headerEl = document.querySelector("header");
// 返回顶部实例
const scrollToTop = document.querySelector(".scrollToTop");

// 窗口滚动处理
window.addEventListener("scroll", () => {
    // 固定导航
    let height = headerEl.getBoundingClientRect().height;

    if (window.pageYOffset - height > 600) {
        if (!headerEl.classList.contains("sticky")) {
            headerEl.classList.add("sticky");
        }
    } else {
        headerEl.classList.remove("sticky");
    }

    // 显示返回顶部
    if (window.pageYOffset > 1000) {
        scrollToTop.style.display = "block";
    } else {
        scrollToTop.style.display = "none";
    }
});

// 轮播
const glide = new Glide(".glide", {
    hoverpause: false
});
// 获取轮播标题实例
const captionsEl = document.querySelectorAll(".slide-caption");
// 当轮播加载完成后，每个轮播完成时，加载标题动画
glide.on(["mount.after", "run.after"], () => {
    // 获取当前展示的轮播index
    const caption = captionsEl[glide.index];
    anime({
        // 对每个子元素进行动画
        targets: caption.children,
        // 透明度
        opacity: [0, 1],
        // 持续时间
        duration: 600,
        easing: "linear",
        // 每个子元素相继延迟400毫秒，第一个延迟300毫秒
        delay: anime.stagger(400, { start: 300 }),
        // 从下向上移动，每行从40到10递减，最后移动到0
        translateY: [anime.stagger([40, 10]), 0]
    });
});

// 轮播进行前，把标题透明度设置为0，还原
glide.on("run.before", () => {
    document.querySelectorAll(".slide-caption > *").forEach(el => {
        el.style.opacity = 0;
    });
});

// 加载轮播，必须在添加事件处理函数之后
glide.mount();

// 滚动展示插件
// 通用动画配置，从底部50象素滑出来
const staggeringOption = {
    delay: 300,
    distance: "60px",
    duration: 1000,
    easing: "ease-in-out",
    origin: "bottom"
};
// 滚动到业务流程时的展示动画，interval需要单独设置，每个feature元素相继350毫秒，下同
ScrollReveal().reveal(".target", { ...staggeringOption});
ScrollReveal().reveal(".member", { ...staggeringOption, interval: 400 });

// 折叠按钮
const burgerEl = document.querySelector(".burger");
const nav = document.querySelector("header nav");
burgerEl.addEventListener("click", () => {
    headerEl.classList.toggle("open");
});

// 折叠菜单打开时，如果点击了链接，则自动关闭全屏导航
nav.addEventListener("click", () => {
    if (headerEl.classList.contains("open")) {
        headerEl.classList.remove("open");
    }
});
