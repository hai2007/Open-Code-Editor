
let endWithsFactory = filename => {

    filename = (filename + "").toLowerCase();

    return function (...typenames) {
        for (let i = 0; i < typenames.length; i++) {
            if (filename.endsWith(typenames[i])) return true;
        }
        return false;
    };
};

// 根据文件名称判断文件类型

export default function (filename) {

    // 获得结尾判断方法
    let endWiths = endWithsFactory(filename);

    if (endWiths('.js')) return { lang: 'JavaScript', owe: 'javascript' };
    if (endWiths('.css')) return { lang: 'CSS', owe: 'css' };
    if (endWiths('.html', '.htm')) return { lang: 'HTML', owe: 'html' };
    if (endWiths('.json')) return { lang: 'JSON', owe: 'json' };
    if (endWiths('.scss', '.sass')) return { lang: 'SASS', owe: 'css' };
    if (endWiths('.png', '.jpg', '.jpeg', '.gif', '.ico')) return { lang: 'Image', owe: 'image' };

    return { lang: 'Plain', owe: 'normal' };
};