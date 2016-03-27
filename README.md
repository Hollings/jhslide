# jhslide
A very basic slider with almost no customization. This has been sitting on my computer since I learned js, and I'm planning on expanding it into a real slider solution in the future.

View demo here: http://hollings.io/jhslide/


<p>Link them in your html like this:</p>
<pre><code class="html">//You need jQuery
&lt;script   src=&quot;https://code.jquery.com/jquery-2.2.2.js&quot;&gt;&lt;/script&gt;

//jhslide files
&lt;link rel=&quot;stylesheet&quot; type=&quot;text/css&quot; href=&quot;jhslide.css&quot;&gt;
&lt;script type=&quot;text/javascript&quot; src=&quot;jhslide.js&quot;&gt;&lt;/script&gt;
</code></pre>
<p>And create "jhslide" class, like this:</p>
<pre><code class="html">&lt;ul class=&quot;jhslide&quot;&gt;
  &lt;li&gt;&lt;h2&gt;This is a slider&lt;/h2&gt;&lt;/li&gt;
  &lt;li&gt;&lt;h3&gt;There are no options&lt;/h3&gt;&lt;/li&gt;
  &lt;li&gt;&lt;h4&gt;Its just a few lines of javascript.&lt;/h4&gt;&lt;/li&gt;
  &lt;li&gt;&lt;img src=&quot;http://dummyimage.com/400x250&amp;text=And it is pretty buggy...&quot; alt=&quot;&quot; /&gt;&lt;/li&gt;
&lt;/ul&gt;
</code></pre>
<p>Finally, initialize it with js:</p>
<pre><code class="html">&lt;script&gt;
jQuery(document).ready(function(){
jQuery('.jhslide').jhslide();
});
&lt;/script&gt;
</code></pre>
