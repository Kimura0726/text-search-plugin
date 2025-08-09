// code.ts - メインのプラグインロジック

interface SearchResult {
  pageId: string;
  pageName: string;
  nodeId: string;
  nodeName: string;
  text: string;
  x: number;
  y: number;
}

// プラグインの初期化
figma.showUI(__html__, { width: 400, height: 600 });

// UIからのメッセージを受信
figma.ui.onmessage = async (msg) => {
  if (msg.type === 'search-text') {
    const searchQuery = msg.query.toLowerCase();
    const results: SearchResult[] = [];

    // 全ページを検索
    for (const page of figma.root.children) {
      if (page.type === 'PAGE') {
        const pageResults = await searchTextInPage(page, searchQuery);
        results.push(...pageResults);
      }
    }

    // 結果をUIに送信
    figma.ui.postMessage({
      type: 'search-results',
      results: results,
      query: msg.query
    });
  }

  if (msg.type === 'navigate-to-node') {
    const page = figma.root.children.find(p => p.id === msg.pageId);
    if (page && page.type === 'PAGE') {
      figma.currentPage = page;
      
      const node = figma.getNodeById(msg.nodeId);
      if (node) {
        figma.viewport.scrollAndZoomIntoView([node]);
        figma.currentPage.selection = [node as SceneNode];
      }
    }
  }

  if (msg.type === 'close-plugin') {
    figma.closePlugin();
  }
};

// ページ内のテキストを検索する関数
async function searchTextInPage(page: PageNode, query: string): Promise<SearchResult[]> {
  const results: SearchResult[] = [];

  function traverseNode(node: BaseNode) {
    // テキストノードの場合
    if (node.type === 'TEXT') {
      const textNode = node as TextNode;
      if (textNode.characters.toLowerCase().includes(query)) {
        results.push({
          pageId: page.id,
          pageName: page.name,
          nodeId: textNode.id,
          nodeName: textNode.name,
          text: textNode.characters,
          x: textNode.x,
          y: textNode.y
        });
      }
    }

    // 子ノードがある場合は再帰的に検索
    if ('children' in node) {
      for (const child of node.children) {
        traverseNode(child);
      }
    }
  }

  traverseNode(page);
  return results;
}

// プラグイン終了時のクリーンアップ
figma.on('close', () => {
  // 必要に応じてクリーンアップ処理
});