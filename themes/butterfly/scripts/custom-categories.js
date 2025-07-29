// themes/your-theme/scripts/custom-categories.js
'use strict';

hexo.extend.helper.register('list_categories_tree', function(categories, options) {
  if (!options && (!categories || !Object.prototype.hasOwnProperty.call(categories, 'length'))) {
    options = categories;
    categories = this.site.categories;
  }

  if (!categories || !categories.length) return '';
  options = options || {};

  const { config } = this;
  const showCount = options.show_count !== false;
  const depth = options.depth ? parseInt(options.depth, 10) : 0;
  const classNames = ['category-tree'];
  if (options.class) classNames.push(options.class);

  // 构建分类树
  const categoryTree = {};
  const categoryList = [];

  categories.forEach(cat => {
    const path = cat.name.split('/');
    let currentLevel = categoryTree;
    
    path.forEach((segment, index) => {
      if (!currentLevel[segment]) {
        currentLevel[segment] = {
          name: segment,
          fullName: path.slice(0, index + 1).join('/'),
          count: 0,
          children: {},
          depth: index
        };
        categoryList.push(currentLevel[segment]);
      }
      
      if (index === path.length - 1) {
        currentLevel[segment].count = cat.length;
        currentLevel[segment].path = cat.path;
      }
      
      currentLevel = currentLevel[segment].children;
    });
  });

  // 生成分类树HTML
  let html = `<div class="${classNames.join(' ')}">`;
  
  categoryList.sort((a, b) => a.fullName.localeCompare(b.fullName));
  
  categoryList.forEach(cat => {
    if (cat.depth === 0) {
      html += renderCategoryNode(cat, categoryTree[cat.name], showCount);
    }
  });
  
  html += '</div>';
  return html;
});

function renderCategoryNode(category, node, showCount) {
  const hasChildren = Object.keys(node.children).length > 0;
  const indent = 20 * category.depth;
  
  let html = `
    <div class="category-node depth-${category.depth}" style="margin-left: ${indent}px">
      <div class="category-header">
        ${hasChildren ? '<span class="category-icon">▶</span>' : '<span class="category-spacer"></span>'}
        <a class="category-link" href="${node.path}">${category.name}</a>
  `;
  
  if (showCount) {
    html += `<span class="category-count">${node.count}</span>`;
  }
  
  html += `</div>`;
  
  if (hasChildren) {
    html += '<div class="category-children" style="display:none">';
    
    Object.values(node.children).forEach(child => {
      html += renderCategoryNode(child, node.children[child.name], showCount);
    });
    
    html += '</div>';
  }
  
  html += '</div>';
  return html;
}