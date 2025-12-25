<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController
{
    /**
     * GET /api/articles?updated=true|false
     */
    public function index(Request $request)
    {
        return Article::query()
            ->when(
                $request->has('updated'),
                fn($q) =>
                $q->where(
                    'is_updated',
                    filter_var($request->updated, FILTER_VALIDATE_BOOLEAN)
                )
            )
            ->get();
    }

    /**
     * POST /api/articles
     */
    public function store(Request $request)
    {
        return Article::create([
            'title' => $request->title,
            'content' => $request->content,
            'is_updated' => $request->is_updated ?? false,
        ]);
    }

    /**
     * GET /api/articles/{id}
     */
    public function show($id)
    {
        return Article::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $article = Article::findOrFail($id);

        $article->content = $request->input('content');
        $article->sources = $request->input('sources', []);
        $article->is_updated = true;

        $article->save();

        return response()->json([
            'message' => 'Article updated successfully'
        ]);
    }
}
