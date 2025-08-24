# How To Use Multiple Implementations of an Interface in .NET Core?

Registering and retrieving multiple implementations from the IoC container

***

### How To Use Multiple Implementations of an Interface in .NET Core

#### Registering and retrieving multiple implementations from the IoC container

![Featured image of this article showing two identical looking flowers loosely representing the topic of this article.](https://cdn-images-1.medium.com/max/800/1*HcTuVfTIzBqQdCqTEgp7MQ.jpeg)

Image source: [Unsplash](https://unsplash.com/photos/EC7bv_A8JU0)

### Introduction

Dependency injection is built into ASP.NET Core allowing developers to achieve Inversion of Control (IoC) between classes and their dependencies. Normally, if class A calls a method on class B, class A has a direct dependency on class B. But with inversion of control, class A calls methods on an abstraction that B implements, thus only loosely coupling the two classes, unlike direct dependency which was tightly coupling the two.

Inverting the dependency helps at compile time. The exact dependency class B doesn’t need to be coded into class A, if class B depends on more classes, that doesn’t need to be manually added in class A, and because of an abstract dependency on class B, writing unit tests and mocking class B in unit tests becomes easier. At runtime, though, things remain unchanged, class A still calls B.

This works great when a single concrete class implements an interface and is then injected into dependent classes. But it's only when you introduce multiple implementations of the same interface into dependency injection that we start noticing an issue.

In this article, we’ll take a look at how we arrive at the problem and then how we might go about solving it and retrieving a specific service from the container. The complete source code for the example used in this article can be found in [this GitHub repository](https://github.com/ClydeDz/multiple-implementations-di-ioc). And under each step of this article, you’ll find a link to the specific changeset from this repository that reflects the example project at that step, in case you’d like to closely follow.

### Single implementation

> If you’d like to follow along, you can view the [GitHub code repository](https://github.com/ClydeDz/multiple-implementations-di-ioc/tree/cdfa74f272f17096f3ff750c1ac774f08b06bcbb) as it was when this step was implemented.

We’ll start with a simple console app, then add an interface and a single concrete class that implements the interface. You can recreate the specifics as per your liking, but if you’d like to follow the main `App.cs` file code snippet is below.

And in the `Program.cs` file, we’ll register our dependencies.

When we run this console app, it prints the message from the concrete implementation.

![](https://cdn-images-1.medium.com/max/800/1*a8-Vf6GYtOGAXmJcDKs7NA.png)

Image courtesy of the author

If I add a breakpoint, it’s evident that the registration of the dependency in the service container is done correctly and the injection of the dependency into the constructor of the class where it’s used is also done correctly. The .NET framework will also take care of disposing of the injected dependency when it’s no longer needed.

![](https://cdn-images-1.medium.com/max/800/1*oHNb6zT0apqkmmTeJ1FYhQ.png)

Image courtesy of the author

Easy peasy so far? Good! For the rest of this article, we’ll build on this codebase.

### Multiple implementations

> If you’d like to follow along, you can view the [GitHub code repository](https://github.com/ClydeDz/multiple-implementations-di-ioc/tree/2b5f345ec69dfacc4ab1ac1bce4fabb4273ea186) as it was when this step was implemented.

Let’s extend the single implementation example and add another concrete class that implements `IAnimals`. I’ve added this additional dependency to the constructor of the `App` class and also made use of this new dependency in the `Run` method.

Don’t forget to register this dependency with the service container in the `Program` class file. When we run this application, what do you think the output will be?

When we actually run the console app, you’ll see duplicate messages printed on the console. This is because the last dependency in the constructor list in the `App` class is what overrides all dependencies of the type `IAnimals`.

![](https://cdn-images-1.medium.com/max/800/1*TYI592ADYKX4RflPM4f6Sw.png)

Image courtesy of the author

If we put a breakpoint in the constructor, we can see that both `domestic` and `wild` have the same implementation `Wild` injected into it.

![](https://cdn-images-1.medium.com/max/800/1*GYbDfpcAtSlxJf9yOZ3WZg.png)

Image courtesy of the author

### How to fix this?

To resolve this issue, we’ll replace the individually added dependencies with an `IEnumerable` list. This list will hold all the dependencies injected for the type `IAnimals`. We can simply put a `foreach` loop to see this in action.

> If you’d like to follow along, you can view the [GitHub code repository](https://github.com/ClydeDz/multiple-implementations-di-ioc/tree/36d6e763e5cdc074e6daadd2013a5d385df07c53) as it was when this step was implemented.

If you put a breakpoint and visualize the animals list in the code snippet, you’ll see both concrete implementations in the list.

![](https://cdn-images-1.medium.com/max/800/1*K5qYimozZtHF8JzBpxjM9Q.png)

Image courtesy of the author

So technically, if all you wanted was to print a message from both implementations without worrying about the order, then this would be okay. As pictured below, both messages are printed, although before the messages from the `Run` method is executed.

![](https://cdn-images-1.medium.com/max/800/1*fCDTXvhrJnqDb_kZ4lbdWA.png)

Image courtesy of the author

### Reassigning dependencies

> If you’d like to follow along, you can view the [GitHub code repository](https://github.com/ClydeDz/multiple-implementations-di-ioc/tree/3b1c03c08217f11285965eb446dd610cdf159079) as it was when this step was implemented.

Just looping through a `foreach` loop doesn’t give us enough flexibility. What we need is to reassign these dependencies so we can use them individually.

Notice how the `foreach` loop looks like in the code snippet below. During each loop, we're checking the type of the current dependency, and then with the help of the `GetService` method from `IServiceProvider`, we're resolving the service and assigning it to a local private variable. The little exclamation mark at the end is a [null-forgiving operator](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/null-forgiving) which tells the compiler that this isn’t going to be null.

The [IServiceCollection](https://learn.microsoft.com/en-us/dotnet/api/microsoft.extensions.dependencyinjection.iservicecollection?view=dotnet-plat-ext-7.0) interface is used for building a dependency injection container, and after it’s fully built, it gets composed into an [IServiceProvider](https://learn.microsoft.com/en-us/dotnet/api/system.iserviceprovider?view=net-7.0) instance which you can inject into any class and use to resolve services.

Because we’re assigning each resolved service into its own variable, we can now independently use that to perform functions with it, like printing the messages from these concrete classes in the right places of the console app. But wait, when I run the application, I get a null reference exception!

![](https://cdn-images-1.medium.com/max/800/1*pPIEYHCyVl2MvRgqGjfTdw.png)

Image courtesy of the author

If I add a breakpoint to the constructor, you can see that although the `animals` list has both concrete implementations injected into it, the assigned variables `_domestic` and `_wild` is still null. This means that the service provider’s `GetService` method isn’t doing its magic.

![](https://cdn-images-1.medium.com/max/800/1*srCkkM1fjZpdLCCd1Bfhsw.png)

Image courtesy of the author

What did we miss? Ah, we did not individually register these services in the service container in the `Program` class file. We’ve now added them in lines 9 and 10 in the code snippet below. Without this explicit registration, the service collection would’ve only contained a registration for `IAnimals` and not for `Domestic` or `Wild`.

Now if I run the application with the breakpoints, I can verify that the assignments have worked correctly.

![](https://cdn-images-1.medium.com/max/800/1*Xyv78ykoGjdL_YXn9EXsFA.png)

Image courtesy of the author

And the output in the console application is printed correctly, too!

![](https://cdn-images-1.medium.com/max/800/1*8OhQIsW5jwWKnzDJUkNC9w.png)

Image courtesy of the author

### Moving this logic up

> If you’d like to follow along, you can view the [GitHub code repository](https://github.com/ClydeDz/multiple-implementations-di-ioc/tree/eb1dbe19579b96f7be0ef3d762a4d88a0dd89481) as it was when this step was implemented.

Rather than writing if conditions in the consuming `App` class, let’s move the logic into the `Program` class file where we’re registering the dependencies.

So, we’ll leave the individually registered services in the file, lines 7 and 8 in the code snippet below. Next, to register an implementation with the type `IAnimals`, we’ll write a `Func<T,TResult>` [delegate](https://learn.microsoft.com/en-us/dotnet/api/system.func-2?view=net-7.0). The body of this method has a simple switch statement that returns the service depending on what type is passed, very similar to the if conditions in the `foreach` loop seen earlier. `AnimalTypes` is a simple enum with `Domestic` and `Wild` as its enum members.

Because we’re resolving the service instance at runtime, we’re registering this using the `AddTransient` method. A quick refresher, when a service is configured as transient, a new instance of that service is created every time it’s needed. While, on the other hand, when a service is configured as scoped, a single instance of that service is created for the duration of an operation of request.

We can now go back to the `App` class file and replace the constructor bit to accept this function delegate and then use that method and pass in the required enum type to return the correct service instance.

In a real scenario, though, if you’re using dynamic service registration, it’s very likely you wouldn’t know what type would this class need, and hence you wouldn’t end up hardcoding like we did in the example above. But since this is an example for the purpose of elaborating a concept, it’s fine to leave this as-is.

Anyway, running our console application now gives us the console output we were expecting, so yay!

![](https://cdn-images-1.medium.com/max/800/1*uHKZm0N10P2i9_CXkND9LA.png)

Image courtesy of the author

Once again, the complete source code used in this article can be found in [this GitHub repository](https://github.com/ClydeDz/multiple-implementations-di-ioc). If you have any questions, feel free to comment below.

That’s it! Thanks for reading.

By [Clyde D'Souza](https://medium.com/@clydedz) on [October 19, 2023](https://medium.com/p/7fbdd31f93a9).

[Canonical link](https://medium.com/@clydedz/how-to-use-multiple-implementations-of-an-interface-in-net-core-7fbdd31f93a9)

Exported from [Medium](https://medium.com) on August 22, 2025.
