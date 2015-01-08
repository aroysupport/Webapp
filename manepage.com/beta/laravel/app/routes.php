<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/



Route::get('/', array(
	'as' => 'index',
	'uses' => 'HomeController@index'
));
Route::get('brand_page', array(
	'as' => 'brand_page',
	'uses' => 'HomeController@brand_page'
));

// Route::get('brand_content', array(
	// 'as' => 'brand_content',
	// 'uses' => 'HomeController@brand_content'
// ));
Route::get('{brandName}',  array(
	'as' => 'brand_content',
	'uses' => 'HomeController@showBrand'));

Route::get('collection_page', array(
	'as' => 'collection_page',
	'uses' => 'HomeController@collection_page'
));
Route::get('collection_content', array(
	'as' => 'collection_content',
	'uses' => 'HomeController@collection_content'
));
Route::get('info', array(
	'as' => 'info',
	'uses' => 'HomeController@info'
));
Route::get('help', array(
	'as' => 'help',
	'uses' => 'HomeController@help'
));
Route::get('privacy', array(
	'as' => 'privacy',
	'uses' => 'HomeController@privacy'
));
// Route::get('remote_in', array(
	// 'as' => 'remote_in',
	// 'uses' => 'HomeController@remote_in'
// ));
// Route::get('remote_in/brand_page', array(
	// 'as' => 'remote_in_brand_page',
	// 'uses' => 'HomeController@remote_in_brand_page'
// ));
// Route::get('remote_in/brand_content', array(
	// 'as' => 'remote_in_brand_content',
	// 'uses' => 'HomeController@remote_in_brand_content'
// ));
// Route::get('remote_in/collection_page', array(
	// 'as' => 'remote_in_collection_page',
	// 'uses' => 'HomeController@remote_in_collection_page'
// ));
// Route::post('remote_in/collection_page', array(
	// 'as' => 'remote_in_post',
	// 'uses' => 'HomeController@remote_in_post'
// ));
// Route::get('remote_in/collection_content', array(
	// 'as' => 'remote_in_collection_content',
	// 'uses' => 'HomeController@remote_in_collection_content'
// ));
// Route::get('remote_in/info', array(
	// 'as' => 'remote_in_info',
	// 'uses' => 'HomeController@remote_in_info'
// ));
// Route::get('remote_in/upload_artwork_agree', array(
	// 'as' => 'remote_in_upload_artwork_agree',
	// 'uses' => 'HomeController@remote_in_upload_artwork_agree'
// ));
// Route::post('remote_in/upload_artwork_agree', array(
	// 'as' => 'remote_in_upload_artwork_agree_post',
	// 'uses' => 'HomeController@remote_in_upload_artwork_agree_post'
// ));
// Route::get('remote_in/upload_artwork_upload', array(
	// 'as' => 'remote_in_upload_artwork_upload',
	// 'uses' => 'HomeController@remote_in_upload_artwork_upload'
// ));
// Route::get('remote_in/upload_artwork_tag', array(
	// 'as' => 'remote_in_upload_artwork_tag',
	// 'uses' => 'HomeController@remote_in_upload_artwork_tag'
// ));
// Route::get('remote_in/upload_artwork_information', array(
	// 'as' => 'remote_in_upload_artwork_information',
	// 'uses' => 'HomeController@remote_in_upload_artwork_information'
// ));