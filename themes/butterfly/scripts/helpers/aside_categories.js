'use strict'

hexo.extend.helper.register('aside_categories', function (categories, options = {}) {
  if (!categories || !Object.prototype.hasOwnProperty.call(categories, 'length')) {
    options = categories || {}
    categories = this.site.categories
  }

  if (!categories || !categories.length) return ''

  const { config } = this
  const showCount = Object.prototype.hasOwnProperty.call(options, 'show_count') ? options.show_count : true
  const depth = options.depth ? parseInt(options.depth, 10) : 0
  const orderby = options.orderby || 'name'
  const order = options.order || 1
  const categoryDir = this.url_for(config.category_dir)
  const limit = options.limit === 0 ? categories.length : (options.limit || categories.length)
  const isExpand = options.expand !== 'none'
  const expandClass = isExpand && options.expand === true ? 'expand' : ''
  const buttonLabel = this._p('aside.more_button')
  const showPosts = Object.prototype.hasOwnProperty.call(options, 'show_posts') ? options.show_posts : true
  const postLimit = options.post_limit || 30 // 默认显示20篇文章

  const prepareQuery = parent => {
    const query = parent ? { parent } : { parent: { $exists: false } }
    return categories.find(query).sort(orderby, order).filter(cat => cat.length)
  }

  const generatePostList = (posts) => {
    let result = ''
    // 替换原有的 toArray() 调用
    const allPosts = posts.toArray();
    
    // 按 order 字段排序（升序）
    allPosts.sort((a, b) => {
      const orderA = a.order || Number.MAX_SAFE_INTEGER;
      const orderB = b.order || Number.MAX_SAFE_INTEGER;
      return orderA - orderB;
    });
    
    // 应用限制
    const limitedPosts = allPosts.slice(0, postLimit);
    // const limitedPosts = posts.limit(postLimit).toArray()
    
    limitedPosts.forEach(post => {
      result += `<li class="card-article-list-item">
                  <a class="card-article-list-link" href="${this.url_for(post.path)}">
                    <span class="card-article-list-name">${post.title}</span>
                  </a>
                </li>`
    })
    
    // 添加"更多"链接
    if (posts.length > postLimit) {
      result += `<li class="card-article-list-item">
                  <a class="card-article-list-link" href="${this.url_for(posts.data[0].path.split('/')[0])}/">
                    <span class="card-article-list-name">${this._p('aside.more_article')} (${posts.length - postLimit})</span>
                  </a>
                </li>`
    }
    
    return result
  }

  const hierarchicalList = (remaining, level = 0, parent) => {
    let result = ''
    if (remaining > 0) {
      prepareQuery(parent).forEach(cat => {
        if (remaining > 0) {
          remaining -= 1
          let child = ''
          let postList = ''
          
          // 递归生成子分类
          if (!depth || level + 1 < depth) {
            const childList = hierarchicalList(remaining, level + 1, cat._id)
            child = childList.result
            remaining = childList.remaining
          }
          
          // 在最深层级生成文章列表
          const isLeafCategory = (!depth || level >= depth - 1) && !child && showPosts
          if (isLeafCategory && cat.posts && cat.posts.length > 0) {
            postList = `<ul class="card-article-list child">${generatePostList(cat.posts)}</ul>`
          }

          // 判断是否有展开内容
          const hasExpandContent = child || postList
          const hasChildClass = hasExpandContent ? 'parent' : ''

          result += `<li class="card-category-list-item ${hasChildClass}">`
          result += `<a class="card-category-list-link" href="${this.url_for(cat.path)}">`
          result += `<span class="card-category-list-name">${cat.name}</span>`

          if (showCount) {
            result += `<span class="card-category-list-count">${cat.length}</span>`
          }

          // 所有层级都显示展开图标（如果有内容）
          if (isExpand && hasExpandContent) {
            result += `<i class="fas fa-caret-left ${expandClass}"></i>`
          }

          result += '</a>'

          // 子分类列表
          if (child) {
            result += `<ul class="card-category-list child">${child}</ul>`
          }
          
          // 文章列表
          if (postList) {
            result += postList
          }

          result += '</li>'
        }
      })
    }
    return { result, remaining }
  }

  const list = hierarchicalList(limit)

  const moreButton = categories.length > limit
    ? `<a class="card-more-btn" href="${categoryDir}/" title="${buttonLabel}">
      <i class="fas fa-angle-right"></i></a>`
    : ''

  return `<div class="item-headline">
            <i class="fas fa-folder-open"></i>
            <span>${this._p('aside.card_categories')}</span>
            ${moreButton}
          </div>
          <ul class="card-category-list${isExpand && list.result ? ' expandBtn' : ''}" id="aside-cat-list">
            ${list.result}
          </ul>`
})