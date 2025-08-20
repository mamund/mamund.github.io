/* 2010-02-26 (mca) fielding-props.js */

var fp = null;
window.onload = function()
{
  fp = fieldingProps();
  fp.init();
}

var fieldingProps = function()
{
  var g = {};

  function init()
  {
    ajax.shouldDebug=false;
    attachEvents();
  }

  function attachEvents()
  {
    var elm;

    elm = document.getElementById('put-form-props');
    if(elm)
    {
      elm.onsubmit = function(){putProperty();return false;};
    }

    elm = document.getElementById('delete-form-props');
    if(elm)
    {
      elm.onsubmit = function(){deleteProperty();return false;};
    }

    elm = document.getElementById('put-form-lock');
    if(elm)
    {
      elm.onsubmit = function(){putLock();return false;};
    }

    elm = document.getElementById('delete-form-lock');
    if(elm)
    {
      elm.onsubmit = function(){deleteLock();return false;};
    }
  }

  function putProperty()
  {
    var elm,url,value,etag;

    elm = document.getElementsByName('value')[0];
    if(elm)
    {
      value=elm.value;
    }

    elm = document.getElementsByName('etag')[0];
    if(elm)
    {
      etag=elm.value;
    }

    elm = document.getElementById('put-form-props');
    if(elm)
    {
      url = elm.action;
    }

    if(url && value && etag)
    {
      ajax.httpPut(url,null,null,false,refreshProps,'application/x-www-form-urlencoded','value='+escape(value),{'if-match':etag});
    }
  }

  function deleteProperty()
  {
    var elm,url,etag;

    elm = document.getElementById('delete-form-props');
    if(elm)
    {
      url = elm.action;
    }

    elm = document.getElementsByName('etag')[0];
    if(elm)
    {
      etag=elm.value;
    }

    if(url && etag)
    {
      ajax.httpDelete(url,null,null,false,refreshProps,{'if-match':etag});
    }
  }

  function refreshProps()
  {
  	var url;
  	
  	url = location.href;
  	url = url.substring(0,url.lastIndexOf('?'));
  	location.href = url;
  }
  
  function putLock()
  {
    elm = document.getElementById('put-form-lock');
    if(elm)
    {
      url = elm.action;
    }

    if(url)
    {
      ajax.httpPut(url,null,null,false,refresh,'application/x-www-form-urlencoded','');
    }
  }

  function deleteLock()
  {
    var elm,url;

    elm = document.getElementById('delete-form-lock');
    if(elm)
    {
      url = elm.action;
    }

    if(url)
    {
      ajax.httpDelete(url,null,null,false,refresh);
    }
  }
  
  function refresh()
  {
  	location.href = location.href;
  } 
  
  var that = {};
  that.init = init;

  return that;
}