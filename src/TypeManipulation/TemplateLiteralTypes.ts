// Intrinsic String Manipulation Types

/**
 * Uppercase<StringType>
 */
type Greeting = 'Hello, world'
type ShoutyGreeting = Uppercase<Greeting>

 
type ASCIICacheKey<Str extends string> = `ID-${Uppercase<Str>}`
type MainID = ASCIICacheKey<"my_app">

/**
 * Lowercase<StringType>
 */
 type Greeting1 = "Hello, world"
 type QuietGreeting1 = Lowercase<Greeting>
           
  
 type ASCIICacheKey1<Str extends string> = `id-${Lowercase<Str>}`
 type MainID1 = ASCIICacheKey<"MY_APP">

 /**
  * Capitalize<StringType>
  */
  type LowercaseGreeting = "hello, world";
  type Greeting2 = Capitalize<LowercaseGreeting>;

  /**
   * Uncapitalize<StringType>
   */
   type UppercaseGreeting = "HELLO WORLD";
   type UncomfortableGreeting = Uncapitalize<UppercaseGreeting>;