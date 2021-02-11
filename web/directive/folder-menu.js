/**
 * <XXX folder-menu='folderPath' />
 * 
 * 展示打开的文件夹folderPath
 * 
 * @author 你好2007
 * 
 * 2020年6月12日于大同
 */

let folderPath = null;
const path = nodeRequire('path');
const fs = nodeRequire('fs');
import image2D from 'image2d';
import owe from '../pages/owe.paper';
import image from '../pages/image.paper';
import $fileType from '../server/$fileType';

import '../assets/styles/folder.scss';

let insertList = function (el, folderPath) {

    if (fs.lstatSync(folderPath).isDirectory()) {

        // 如果已经加载了
        if (el.__oce_folder_loader__ == "loaded") {

            // 控制打开和关闭
            if (el.getAttribute('hadOpen') == 'no') {
                el.setAttribute('hadOpen', 'yes');
            } else {
                el.setAttribute('hadOpen', 'no');
            }

            return;
        }

        let template = "<ul>";

        // 读取子文件
        const subFiles = fs.readdirSync(folderPath);

        let fileTemplate = "", folderTemplate = "";


        subFiles.forEach(function (file) {

            let filePath = path.join(folderPath, "./" + file);

            // 判断是文件夹还是文本
            if (fs.lstatSync(filePath).isDirectory()) {

                // 过滤一些文件夹不显示
                if (['.git'].indexOf(file) < 0) {

                    folderTemplate += `<li path='${filePath}' name='${file}' type='folder'>
                <span>${file}</span>
            </li>`;

                }

            } else {

                // 过滤一些文件不显示
                if (['.DS_Store'].indexOf(file) < 0) {

                    let fileTypeResult = $fileType(file);

                    console.log(fileTypeResult);

                    fileTemplate += `<li path='${filePath}' owe-lang='${fileTypeResult.owe}'  icon-lang='${fileTypeResult.lang}' name='${file}' type='file'>
                <span>${file}</span>
            </li>`;

                }

            }

        });

        template += `${folderTemplate}${fileTemplate}</ul>`;

        let ulDom = image2D(template);

        ulDom.children().bind('click', function (event) {
            image2D.stopPropagation(event);

            // 递归调用
            insertList(this, this.getAttribute('path'));

        });

        ulDom.appendTo(el);
        el.__oce_folder_loader__ = "loaded";
        el.setAttribute('hadOpen', 'yes');

    }

    // 如果是文件，应该打开
    // 如果已经打开，应该切换显示
    else {

        const path = el.getAttribute('path');

        // 如果是图片

        if (el.getAttribute('owe-lang') == 'image') {

            quickPaper.trigger('loadPage', {
                id: "oce@image:" + path,
                component: image,
                data: {
                    name: el.getAttribute('name'),
                    path
                }
            });

        }

        // 默认使用文本编辑器 Open Web Editor 打开

        else {

            quickPaper.trigger('loadPage', {
                id: "oce@owe:" + path,
                component: owe,
                data: {
                    name: el.getAttribute('name'),
                    type: el.getAttribute('owe-lang'),
                    content: fs.readFileSync(path, 'utf-8'),
                    path
                }
            });

        }

    }

};

export default {
    update(el, binding) {

        // 选择相同的路径不会再次为你刷新文件夹列表
        if (folderPath == binding.value) { return; } else {
            folderPath = binding.value;
        }

        insertList(el, folderPath);
    }
};