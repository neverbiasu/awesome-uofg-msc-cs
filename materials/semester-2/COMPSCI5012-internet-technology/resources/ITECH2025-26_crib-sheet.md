# ITECH2025-26_crib-sheet

Crib sheet – COMPSCI5012 \(Internet Technology M\) 2025\-26

## __System & Information Architecture__

- Architecture diagram: key components \+ data/comm flows \(arrows\)\. Use early for scope, responsibilities, and communication; tech can be chosen late\.
- 3\-tier: client \(UI\) <\-> middleware \(logic\) <\-> database \(persistence\)\. Middleware: DNS/LB/web/app server/cache\.
- ERD: entities \+ relationships \+ attributes; rectangles=entities, diamonds=relationships; 1/M cardinality\.
- IA: requirements \(stories/personas\), sitemap \(structure\), user flow \(task steps\), wireframe \(screen structure\)\.
- Accessibility: ALT text for images \(empty ALT if decorative\)\.

## __WAFs & Django__

- Framework vs library: framework controls flow \(calls your code\); library is called by your code\.
- WAFs provide routing, templates, sessions/auth, ORM/DB abstraction\.
- Django: urls\.py \-> views\.py \-> templates; models\.py defines ORM data model\.

## __HTML / CSS / Bootstrap__

- HTML: head=metadata, body=content; elements open/close; empty e\.g\. <br>\.
- CSS selectors: element, \.class, \#id, descendant, pseudo\. Rule: selector \{ property: value; \}\.
- Cascade: \#id > \.class > element; ties go to last rule\.
- Box model: content \-> padding \-> border \-> margin\. Bootstrap: responsive UI toolkit\.

## __Protocols / HTTP / REST__

- Protocol: rules for message types, syntax, semantics, timing\.
- URL: scheme \+ domain \+ path; DNS \-> IP; flow: DNS \-> TCP \(80/443\) \-> HTTP \(\+ more for CSS/JS/images\)\.
- HTTP stateless; use cookies/sessions/hidden fields/URL session IDs for state\.
- GET retrieves \(URL params; safe/idempotent; cache/bookmark\)\. POST submits body \(side effects/updates; large/special chars; avoid sensitive data in URL\)\.
- Codes: 200, 301, 400, 404, 505\. REST exchanges resources \(JSON/XML\) via HTTP methods\.

## __Client\-side \(DOM \+ Events\)__

- DOM: getElementById, getElementsByTagName/ClassName, querySelector\(All\); update via innerHTML\.
- Events: capture vs bubble; handlers run during propagation\. Create/insert: createElement \+ appendChild\.

## __JavaScript Essentials__

- JS adds behaviour; external JS preferred\. Gotchas: case\-sensitive; \+ concatenates; == vs ===; null vs undefined\.

## __jQuery \+ AJAX__

- jQuery: $\(selector\)\.action\(\); run after load with $\(fn\); $\(this\) is current element in handler\. Useful: \.text/\.html/\.addClass/\.toggleClass/\.css\.
- AJAX/XHR: update without reload; success often readyState==4 && status==200; use responseText/responseXML; POST for updates/complex data\.

## __XML / JSON__

- XML: structured data; strict \(close tags, nesting, quoted attrs, one root\)\. Well\-formed vs valid \(DTD/Schema\)\.
- Parsing: DOM tree \(easy, memory\) vs SAX stream \(low memory\)\. JSON: name/value \+ arrays; JSON\.parse\(text\)\.

### Django: Flow

- URL → view → \(models/ORM\) → template → response

### Django: Models

- Fields: CharField\(max\_length=…\), TextField, EmailField, URLField, IntegerField/PositiveIntegerField, BooleanField
- DecimalField\(max\_digits=…, decimal\_places=…\), DateField/DateTimeField\(auto\_now\_add/auto\_now\)
- ImageField/FileField\(upload\_to="…", blank=True\), SlugField\(unique=True, blank=True\)
- Relations: OneToOneField\(User\), ForeignKey\(Other\), ManyToManyField\(Other, blank=True\)
- Migrations: makemigrations → migrate

class Thing\(models\.Model\):  
     name = models\.CharField\(max\_length=100\)  
     def \_\_str\_\_\(self\): return self\.name

### Django: ORM / QuerySets

- all\(\), filter\(\), exclude\(\), order\_by\("field"\) / order\_by\("\-field"\) \(reverse order\)
- Related: fk\_\_field=value ; Null: field\_\_isnull=True ; Helpers: exists\(\), count\(\), first\(\), \[:5\]

### Django: Views \(FBV\)

- render\(request, "app/t\.html", context\)
- get\_object\_or\_404\(Model, pk=…, slug=…\)
- redirect\("name"\) OR HttpResponseRedirect\(reverse\("name", args=\[…\]\)\)

### Django: URLs

- path\("route/", views\.view, name="view"\)
- Converters: <int:id>, <slug:slug>

urlpatterns = \[path\('item/<int:id>/', views\.detail, name='detail'\)\]

### Django: Templates

- \{\{ var \}\} / \{\{ obj\.field \}\} ; \{% if %\}…\{% endif %\} ; \{% for %\}…\{% empty %\}…\{% endfor %\}
- \{% url "name" arg %\} ; \{% extends "base\.html" %\} \+ \{% block content %\}

### Django: Forms \(pattern\)

if request\.method=='POST':  
     form = Form\(request\.POST, request\.FILES\)  
     if form\.is\_valid\(\): form\.save\(\); return redirect\('name'\)  
 else: form = Form\(\)  
 return render\(request,'t\.html',\{'form': form\}\)

### Django: Auth \+ Admin \+ Troubleshooting

- Auth: request\.user\.is\_authenticated ; @login\_required ; template: \{% if user\.is\_authenticated %\}
- Admin: admin\.site\.register\(Model\)
- Stuck? Check: URLconf names/args, template path, migrations, model field names\.

