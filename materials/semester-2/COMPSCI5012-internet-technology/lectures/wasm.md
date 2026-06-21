# wasm

Learning Outcomes
appreciate that code may be executed in different locations
contrast different browser-based execution models
construct simple 
WebAssembly
 programs for in-browser execution
apply appropriate policies to ensure secure execution of untrusted code

Part 1:  where is code executed?
appreciate that code may be executed in different locations

The Life of a Program
source code
binary code
executing code
compiler
processor

The Life of a Program
source code
binary code
executing code
compiler
processor

software in a box

software from an app store

software from a website

The Life of a Program
source code
binary code
executing code
compiler
processor
interpreter

Django-style web app on a website

The Life of a Program
source code
binary code
executing code
compiler
processor
interpreter

Our focus today: 
in-browser
 execution
code served from remote web server
code interpreted / executed in the browser

Part 2:  history of browser-based execution
contrast different browser-based execution models

Making Code Portable
normally, source code is compiled to binary executable code for a 
particular platform
, e.g. Intel x86 / Apple M3, etc.
To make executable code portable, we need to target a 
portable bytecode format
, e.g. p-code, JVM bytecode, 
WebAssembly

The Life of a Binary Program
source code
binary code
executing code
compiler
processor

The Life of a Portable Bytecode Program
source code
portable bytecode
executing code
compiler
interpreter
VM

History of Portable Bytecodes
p-code
: output by the UCSD Pascal Compiler (1970s/80s)
Flash: animation-based applications (1990s/2000s)
Java Virtual Machine 
bytecode: Java compilation target (1990s-)
.NET Common Intermediate Language
: Microsoft (2000s-)
WebAssembly
: generic web-based intermediate code (2010s-)	

Typical Bytecode Platform Model
stack-based execution
simple primitive types
structured control flow
load/store flat memory architecture

WebAssembly
 Instruction Examples
check out 
https://pengowray.github.io/wasm-ops/
 
integer constants:  
i32.const
integer loads: 
i32.load
integer arithmetic: 
i32.add
comparisons: 
i32.eq
branches: 
if
 

Part 3: my first 
Wasm
 program
construct simple 
WebAssembly
 programs for in-browser execution

Run a simple 
Wasm
 Program: Pythagoras
Look at 
https://learn-wasm.dev/tutorial/introduction/learning-environment
 
input parameter a        
local.get
 $a
square this value          
 
local.get
 $a    i32.mul
input parameter b        
local.get
 $b
square this value        
local.get
 $b    i32.mul
add the two squares together      
i32.add
  
return the result

Challenge – write a program to see whether it’s a leap year…
input parameter year        
local.get
 $year   OR i32.const 2026
constant value 4          
 i32.const  4
integer remainder                
i32.rem_u
branch if ==0       
i32.const 0   i32.eq    if …
return true 
i32.const 1
or return false 
i32.const 0

Challenge – write a program to see whether it’s a leap year…
(does the integer year divide exactly by 4 ?)

https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/Numeric/rem
 
(module
  (import "console" "log" (
func
 $log (param i32)))
  (
func
 $main
    i32.const 2026
    i32.const 4
    i32.rem_u ;; calculate the remainder
    i32.const 0
    i32.eq
    (if (result i32)
      (then (i32.const 1))
      (else (i32.const 0))
    )
    call $log ;; log the result
  )
  (start $main)
)

Wasm
 programs are everywhere!
on the web
in standalone 
Wasm
 runtimes (e.g. 
wasmtime
) on Unix machines
in IoT devices

Why is 
Wasm
 better than / different to JavaScript?
Wasm
 has a formal model, so easier to check 
correctness
Wasm
 is strongly typed, so easier to make code more 
efficient
Wasm
 is compiled bytecode, so 
smaller
 than textual source code
Wasm
 has a well-defined 
security model 
for execution

Part 4: we need secure execution
apply appropriate policies to ensure secure execution of untrusted code

why can’t we just execute
untrusted code?

Why can’t we just execute untrusted code?
it might damage our system
it might exfiltrate our data
it might use our compute resources to do work for someone else

Execution in a sandbox
a sandbox (e.g. a docker container) is an isolated compute environment which has limited access to physical resources on our system
effectively, the browser provides a sandbox for JavaScript code execution 

Firefox sandbox
about:config
   
-> sandbox

Execution with capabilities
a capability is a dynamic permission for a program to perform a certain action
WebAssembly
 has runtime access capabilities, to grant access to resources (like files, network sockets, 
etc
)

Execution with memory bounds
Recall that 
Wasm
 has a linear, flat memory
All accesses to memory are bounds-checked – you cannot access data outside of the 
Wasm
 memory region 
So – 
no buffer overflow 
attacks

Lecture Summary
appreciate that code may be executed in different locations
contrast different browser-based execution models
construct simple WebAssembly programs for in-browser execution
apply appropriate policies to ensure secure execution of untrusted code

COMPSCI5012
Internet Technology (M)
WebAssembly
and other
Portable Executable Formats
Jeremy.Singer@glasgow.ac.uk

