#if 0
#elif defined(__arm64__) && __arm64__
// Generated by Apple Swift version 5.7.2 (swiftlang-5.7.2.135.5 clang-1400.0.29.51)
#ifndef EXPOMODULESCORE_SWIFT_H
#define EXPOMODULESCORE_SWIFT_H
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wgcc-compat"

#if !defined(__has_include)
# define __has_include(x) 0
#endif
#if !defined(__has_attribute)
# define __has_attribute(x) 0
#endif
#if !defined(__has_feature)
# define __has_feature(x) 0
#endif
#if !defined(__has_warning)
# define __has_warning(x) 0
#endif

#if __has_include(<swift/objc-prologue.h>)
# include <swift/objc-prologue.h>
#endif

#pragma clang diagnostic ignored "-Wduplicate-method-match"
#pragma clang diagnostic ignored "-Wauto-import"
#if defined(__OBJC__)
#include <Foundation/Foundation.h>
#endif
#if defined(__cplusplus)
#include <cstdint>
#include <cstddef>
#include <cstdbool>
#else
#include <stdint.h>
#include <stddef.h>
#include <stdbool.h>
#endif

#if !defined(SWIFT_TYPEDEFS)
# define SWIFT_TYPEDEFS 1
# if __has_include(<uchar.h>)
#  include <uchar.h>
# elif !defined(__cplusplus)
typedef uint_least16_t char16_t;
typedef uint_least32_t char32_t;
# endif
typedef float swift_float2  __attribute__((__ext_vector_type__(2)));
typedef float swift_float3  __attribute__((__ext_vector_type__(3)));
typedef float swift_float4  __attribute__((__ext_vector_type__(4)));
typedef double swift_double2  __attribute__((__ext_vector_type__(2)));
typedef double swift_double3  __attribute__((__ext_vector_type__(3)));
typedef double swift_double4  __attribute__((__ext_vector_type__(4)));
typedef int swift_int2  __attribute__((__ext_vector_type__(2)));
typedef int swift_int3  __attribute__((__ext_vector_type__(3)));
typedef int swift_int4  __attribute__((__ext_vector_type__(4)));
typedef unsigned int swift_uint2  __attribute__((__ext_vector_type__(2)));
typedef unsigned int swift_uint3  __attribute__((__ext_vector_type__(3)));
typedef unsigned int swift_uint4  __attribute__((__ext_vector_type__(4)));
#endif

#if !defined(SWIFT_PASTE)
# define SWIFT_PASTE_HELPER(x, y) x##y
# define SWIFT_PASTE(x, y) SWIFT_PASTE_HELPER(x, y)
#endif
#if !defined(SWIFT_METATYPE)
# define SWIFT_METATYPE(X) Class
#endif
#if !defined(SWIFT_CLASS_PROPERTY)
# if __has_feature(objc_class_property)
#  define SWIFT_CLASS_PROPERTY(...) __VA_ARGS__
# else
#  define SWIFT_CLASS_PROPERTY(...)
# endif
#endif

#if __has_attribute(objc_runtime_name)
# define SWIFT_RUNTIME_NAME(X) __attribute__((objc_runtime_name(X)))
#else
# define SWIFT_RUNTIME_NAME(X)
#endif
#if __has_attribute(swift_name)
# define SWIFT_COMPILE_NAME(X) __attribute__((swift_name(X)))
#else
# define SWIFT_COMPILE_NAME(X)
#endif
#if __has_attribute(objc_method_family)
# define SWIFT_METHOD_FAMILY(X) __attribute__((objc_method_family(X)))
#else
# define SWIFT_METHOD_FAMILY(X)
#endif
#if __has_attribute(noescape)
# define SWIFT_NOESCAPE __attribute__((noescape))
#else
# define SWIFT_NOESCAPE
#endif
#if __has_attribute(ns_consumed)
# define SWIFT_RELEASES_ARGUMENT __attribute__((ns_consumed))
#else
# define SWIFT_RELEASES_ARGUMENT
#endif
#if __has_attribute(warn_unused_result)
# define SWIFT_WARN_UNUSED_RESULT __attribute__((warn_unused_result))
#else
# define SWIFT_WARN_UNUSED_RESULT
#endif
#if __has_attribute(noreturn)
# define SWIFT_NORETURN __attribute__((noreturn))
#else
# define SWIFT_NORETURN
#endif
#if !defined(SWIFT_CLASS_EXTRA)
# define SWIFT_CLASS_EXTRA
#endif
#if !defined(SWIFT_PROTOCOL_EXTRA)
# define SWIFT_PROTOCOL_EXTRA
#endif
#if !defined(SWIFT_ENUM_EXTRA)
# define SWIFT_ENUM_EXTRA
#endif
#if !defined(SWIFT_CLASS)
# if __has_attribute(objc_subclassing_restricted)
#  define SWIFT_CLASS(SWIFT_NAME) SWIFT_RUNTIME_NAME(SWIFT_NAME) __attribute__((objc_subclassing_restricted)) SWIFT_CLASS_EXTRA
#  define SWIFT_CLASS_NAMED(SWIFT_NAME) __attribute__((objc_subclassing_restricted)) SWIFT_COMPILE_NAME(SWIFT_NAME) SWIFT_CLASS_EXTRA
# else
#  define SWIFT_CLASS(SWIFT_NAME) SWIFT_RUNTIME_NAME(SWIFT_NAME) SWIFT_CLASS_EXTRA
#  define SWIFT_CLASS_NAMED(SWIFT_NAME) SWIFT_COMPILE_NAME(SWIFT_NAME) SWIFT_CLASS_EXTRA
# endif
#endif
#if !defined(SWIFT_RESILIENT_CLASS)
# if __has_attribute(objc_class_stub)
#  define SWIFT_RESILIENT_CLASS(SWIFT_NAME) SWIFT_CLASS(SWIFT_NAME) __attribute__((objc_class_stub))
#  define SWIFT_RESILIENT_CLASS_NAMED(SWIFT_NAME) __attribute__((objc_class_stub)) SWIFT_CLASS_NAMED(SWIFT_NAME)
# else
#  define SWIFT_RESILIENT_CLASS(SWIFT_NAME) SWIFT_CLASS(SWIFT_NAME)
#  define SWIFT_RESILIENT_CLASS_NAMED(SWIFT_NAME) SWIFT_CLASS_NAMED(SWIFT_NAME)
# endif
#endif

#if !defined(SWIFT_PROTOCOL)
# define SWIFT_PROTOCOL(SWIFT_NAME) SWIFT_RUNTIME_NAME(SWIFT_NAME) SWIFT_PROTOCOL_EXTRA
# define SWIFT_PROTOCOL_NAMED(SWIFT_NAME) SWIFT_COMPILE_NAME(SWIFT_NAME) SWIFT_PROTOCOL_EXTRA
#endif

#if !defined(SWIFT_EXTENSION)
# define SWIFT_EXTENSION(M) SWIFT_PASTE(M##_Swift_, __LINE__)
#endif

#if !defined(OBJC_DESIGNATED_INITIALIZER)
# if __has_attribute(objc_designated_initializer)
#  define OBJC_DESIGNATED_INITIALIZER __attribute__((objc_designated_initializer))
# else
#  define OBJC_DESIGNATED_INITIALIZER
# endif
#endif
#if !defined(SWIFT_ENUM_ATTR)
# if defined(__has_attribute) && __has_attribute(enum_extensibility)
#  define SWIFT_ENUM_ATTR(_extensibility) __attribute__((enum_extensibility(_extensibility)))
# else
#  define SWIFT_ENUM_ATTR(_extensibility)
# endif
#endif
#if !defined(SWIFT_ENUM)
# define SWIFT_ENUM(_type, _name, _extensibility) enum _name : _type _name; enum SWIFT_ENUM_ATTR(_extensibility) SWIFT_ENUM_EXTRA _name : _type
# if __has_feature(generalized_swift_name)
#  define SWIFT_ENUM_NAMED(_type, _name, SWIFT_NAME, _extensibility) enum _name : _type _name SWIFT_COMPILE_NAME(SWIFT_NAME); enum SWIFT_COMPILE_NAME(SWIFT_NAME) SWIFT_ENUM_ATTR(_extensibility) SWIFT_ENUM_EXTRA _name : _type
# else
#  define SWIFT_ENUM_NAMED(_type, _name, SWIFT_NAME, _extensibility) SWIFT_ENUM(_type, _name, _extensibility)
# endif
#endif
#if !defined(SWIFT_UNAVAILABLE)
# define SWIFT_UNAVAILABLE __attribute__((unavailable))
#endif
#if !defined(SWIFT_UNAVAILABLE_MSG)
# define SWIFT_UNAVAILABLE_MSG(msg) __attribute__((unavailable(msg)))
#endif
#if !defined(SWIFT_AVAILABILITY)
# define SWIFT_AVAILABILITY(plat, ...) __attribute__((availability(plat, __VA_ARGS__)))
#endif
#if !defined(SWIFT_WEAK_IMPORT)
# define SWIFT_WEAK_IMPORT __attribute__((weak_import))
#endif
#if !defined(SWIFT_DEPRECATED)
# define SWIFT_DEPRECATED __attribute__((deprecated))
#endif
#if !defined(SWIFT_DEPRECATED_MSG)
# define SWIFT_DEPRECATED_MSG(...) __attribute__((deprecated(__VA_ARGS__)))
#endif
#if __has_feature(attribute_diagnose_if_objc)
# define SWIFT_DEPRECATED_OBJC(Msg) __attribute__((diagnose_if(1, Msg, "warning")))
#else
# define SWIFT_DEPRECATED_OBJC(Msg) SWIFT_DEPRECATED_MSG(Msg)
#endif
#if defined(__OBJC__)
#if !defined(IBSegueAction)
# define IBSegueAction
#endif
#endif
#if !defined(SWIFT_EXTERN)
# if defined(__cplusplus)
#  define SWIFT_EXTERN extern "C"
# else
#  define SWIFT_EXTERN extern
# endif
#endif
#if !defined(SWIFT_CALL)
# define SWIFT_CALL __attribute__((swiftcall))
#endif
#if defined(__cplusplus)
#if !defined(SWIFT_NOEXCEPT)
# define SWIFT_NOEXCEPT noexcept
#endif
#else
#if !defined(SWIFT_NOEXCEPT)
# define SWIFT_NOEXCEPT 
#endif
#endif
#if defined(__cplusplus)
#if !defined(SWIFT_CXX_INT_DEFINED)
#define SWIFT_CXX_INT_DEFINED
namespace swift {
using Int = ptrdiff_t;
using UInt = size_t;
}
#endif
#endif
#if defined(__OBJC__)
#if __has_feature(modules)
#if __has_warning("-Watimport-in-framework-header")
#pragma clang diagnostic ignored "-Watimport-in-framework-header"
#endif
@import CoreFoundation;
@import Foundation;
@import ObjectiveC;
@import React;
@import UIKit;
#endif

#import <ExpoModulesCore/ExpoModulesCore.h>

#endif
#pragma clang diagnostic ignored "-Wproperty-attribute-mismatch"
#pragma clang diagnostic ignored "-Wduplicate-method-arg"
#if __has_warning("-Wpragma-clang-attribute")
# pragma clang diagnostic ignored "-Wpragma-clang-attribute"
#endif
#pragma clang diagnostic ignored "-Wunknown-pragmas"
#pragma clang diagnostic ignored "-Wnullability"
#pragma clang diagnostic ignored "-Wdollar-in-identifier-extension"

#if __has_attribute(external_source_symbol)
# pragma push_macro("any")
# undef any
# pragma clang attribute push(__attribute__((external_source_symbol(language="Swift", defined_in="ExpoModulesCore",generated_declaration))), apply_to=any(function,enum,objc_interface,objc_category,objc_protocol))
# pragma pop_macro("any")
#endif

#if defined(__OBJC__)
@class RCTBridge;
@class EXJavaScriptRuntime;
@class ViewModuleWrapper;
@class NSString;
@class EXJavaScriptObject;
@class EXModulesProxyConfig;
@class ModulesProvider;

/// The app context is an interface to a single Expo app.
SWIFT_CLASS_NAMED("AppContext")
@interface EXAppContext : NSObject
/// React bridge of the context’s app. Can be <code>nil</code> when the bridge
/// hasn’t been propagated to the bridge modules yet (see <code>ExpoBridgeModule</code>),
/// or when the app context is “bridgeless” (for example in native unit tests).
@property (nonatomic, readonly, weak) RCTBridge * _Nullable reactBridge;
/// JSI runtime of the running app.
@property (nonatomic, strong) EXJavaScriptRuntime * _Nullable runtime;
/// Designated initializer without modules provider.
- (nonnull instancetype)init OBJC_DESIGNATED_INITIALIZER;
/// Returns view modules wrapped by the base <code>ViewModuleWrapper</code> class.
- (NSArray<ViewModuleWrapper *> * _Nonnull)getViewManagers SWIFT_WARN_UNUSED_RESULT;
/// Returns a bool whether the module with given name is registered in this context.
- (BOOL)hasModule:(NSString * _Nonnull)moduleName SWIFT_WARN_UNUSED_RESULT;
/// Returns an array of names of the modules registered in the module registry.
- (NSArray<NSString *> * _Nonnull)getModuleNames SWIFT_WARN_UNUSED_RESULT;
/// Returns a JavaScript object that represents a module with given name.
/// When remote debugging is enabled, this will always return <code>nil</code>.
- (EXJavaScriptObject * _Nullable)getNativeModuleObject:(NSString * _Nonnull)moduleName SWIFT_WARN_UNUSED_RESULT;
/// Returns an array of event names supported by all Swift modules.
- (NSArray<NSString *> * _Nonnull)getSupportedEvents SWIFT_WARN_UNUSED_RESULT;
/// Modifies listeners count for module with given name. Depending on the listeners count,
/// <code>onStartObserving</code> and <code>onStopObserving</code> are called.
- (void)modifyEventListenersCount:(NSString * _Nonnull)moduleName count:(NSInteger)count;
/// Asynchronously calls module’s function with given arguments.
- (void)callFunction:(NSString * _Nonnull)functionName onModule:(NSString * _Nonnull)moduleName withArgs:(NSArray * _Nonnull)args resolve:(EXPromiseResolveBlock _Nonnull)resolve reject:(EXPromiseRejectBlock _Nonnull)reject;
@property (nonatomic, strong) EXModulesProxyConfig * _Nullable expoModulesConfig;
/// Returns an instance of the generated Expo modules provider.
/// The provider is usually generated in application’s <code>ExpoModulesProviders</code> files group.
+ (ModulesProvider * _Nonnull)modulesProviderWithName:(NSString * _Nonnull)providerName SWIFT_WARN_UNUSED_RESULT;
@end


/// Base class for app delegate subscribers. Ensures the class
/// inherits from <code>UIResponder</code> and has <code>required init()</code> initializer.
SWIFT_CLASS_NAMED("BaseExpoAppDelegateSubscriber")
@interface EXBaseAppDelegateSubscriber : UIResponder
- (nonnull instancetype)init OBJC_DESIGNATED_INITIALIZER;
@end

@protocol RCTEventDispatcherProtocol;

/// Custom component data extending <code>RCTComponentData</code>. Its main purpose is to handle event-based props (callbacks),
/// but it also simplifies capturing the view config so we can omit some reflections that React Native executes.
SWIFT_CLASS_NAMED("ComponentData")
@interface EXComponentData : RCTComponentData
/// Initializer that additionally takes the original view module to have access to its definition.
- (nonnull instancetype)initWithViewModule:(ViewModuleWrapper * _Nonnull)viewModule managerClass:(SWIFT_METATYPE(ViewModuleWrapper) _Nonnull)managerClass bridge:(RCTBridge * _Nonnull)bridge OBJC_DESIGNATED_INITIALIZER;
/// Creates a setter for the specific prop. For non-event props we just let React Native do its job.
/// Events are handled differently to conveniently use them in Swift.
- (RCTPropBlockAlias _Nonnull)createPropBlock:(NSString * _Nonnull)propName isShadowView:(BOOL)isShadowView SWIFT_WARN_UNUSED_RESULT;
/// The base <code>RCTComponentData</code> class does some Objective-C dynamic calls in this function, but we don’t
/// need to do these slow operations since the Sweet API gives us necessary details without reflections.
- (NSDictionary<NSString *, id> * _Nonnull)viewConfig SWIFT_WARN_UNUSED_RESULT;
- (nonnull instancetype)initWithManagerClass:(Class _Nonnull)managerClass bridge:(RCTBridge * _Nonnull)bridge eventDispatcher:(id <RCTEventDispatcherProtocol> _Nonnull)eventDispatcher SWIFT_UNAVAILABLE;
@end

@class UIWindow;
@class ExpoReactDelegate;
@class UIApplication;
@class NSData;
@class NSUserActivity;
@protocol UIUserActivityRestoring;
@class UIApplicationShortcutItem;
@class NSURL;
@protocol EXAppDelegateSubscriberProtocol;

/// Allows classes extending <code>ExpoAppDelegateSubscriber</code> to hook into project’s app delegate
/// by forwarding <code>UIApplicationDelegate</code> events to the subscribers.
/// Keep functions and markers in sync with https://developer.apple.com/documentation/uikit/uiapplicationdelegate
SWIFT_CLASS_NAMED("ExpoAppDelegate")
@interface EXExpoAppDelegate : UIResponder <UIApplicationDelegate>
@property (nonatomic, strong) UIWindow * _Nullable window;
@property (nonatomic, readonly, strong) ExpoReactDelegate * _Nonnull reactDelegate;
- (BOOL)application:(UIApplication * _Nonnull)application willFinishLaunchingWithOptions:(NSDictionary<UIApplicationLaunchOptionsKey, id> * _Nullable)launchOptions SWIFT_WARN_UNUSED_RESULT;
- (BOOL)application:(UIApplication * _Nonnull)application didFinishLaunchingWithOptions:(NSDictionary<UIApplicationLaunchOptionsKey, id> * _Nullable)launchOptions SWIFT_WARN_UNUSED_RESULT;
- (void)applicationDidBecomeActive:(UIApplication * _Nonnull)application;
- (void)applicationWillResignActive:(UIApplication * _Nonnull)application;
- (void)applicationDidEnterBackground:(UIApplication * _Nonnull)application;
- (void)applicationWillEnterForeground:(UIApplication * _Nonnull)application;
- (void)applicationWillTerminate:(UIApplication * _Nonnull)application;
- (void)application:(UIApplication * _Nonnull)application handleEventsForBackgroundURLSession:(NSString * _Nonnull)identifier completionHandler:(void (^ _Nonnull)(void))completionHandler;
- (void)application:(UIApplication * _Nonnull)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData * _Nonnull)deviceToken;
- (void)application:(UIApplication * _Nonnull)application didFailToRegisterForRemoteNotificationsWithError:(NSError * _Nonnull)error;
- (void)application:(UIApplication * _Nonnull)application didReceiveRemoteNotification:(NSDictionary * _Nonnull)userInfo fetchCompletionHandler:(void (^ _Nonnull)(UIBackgroundFetchResult))completionHandler;
- (BOOL)application:(UIApplication * _Nonnull)application willContinueUserActivityWithType:(NSString * _Nonnull)userActivityType SWIFT_WARN_UNUSED_RESULT;
- (BOOL)application:(UIApplication * _Nonnull)application continueUserActivity:(NSUserActivity * _Nonnull)userActivity restorationHandler:(void (^ _Nonnull)(NSArray<id <UIUserActivityRestoring>> * _Nullable))restorationHandler SWIFT_WARN_UNUSED_RESULT;
- (void)application:(UIApplication * _Nonnull)application didUpdateUserActivity:(NSUserActivity * _Nonnull)userActivity;
- (void)application:(UIApplication * _Nonnull)application didFailToContinueUserActivityWithType:(NSString * _Nonnull)userActivityType error:(NSError * _Nonnull)error;
- (void)application:(UIApplication * _Nonnull)application performActionForShortcutItem:(UIApplicationShortcutItem * _Nonnull)shortcutItem completionHandler:(void (^ _Nonnull)(BOOL))completionHandler;
- (void)application:(UIApplication * _Nonnull)application performFetchWithCompletionHandler:(void (^ _Nonnull)(UIBackgroundFetchResult))completionHandler;
- (BOOL)application:(UIApplication * _Nonnull)app openURL:(NSURL * _Nonnull)url options:(NSDictionary<UIApplicationOpenURLOptionsKey, id> * _Nonnull)options SWIFT_WARN_UNUSED_RESULT;
+ (void)registerSubscribersFromModulesProvider:(ModulesProvider * _Nonnull)modulesProvider;
+ (void)registerSubscriber:(id <EXAppDelegateSubscriberProtocol> _Nonnull)subscriber;
+ (id <EXAppDelegateSubscriberProtocol> _Nullable)getSubscriber:(NSString * _Nonnull)name SWIFT_WARN_UNUSED_RESULT;
+ (void)registerReactDelegateHandlersFromModulesProvider:(ModulesProvider * _Nonnull)modulesProvider;
- (nonnull instancetype)init OBJC_DESIGNATED_INITIALIZER;
@end


/// Typealias to <code>UIApplicationDelegate</code> protocol.
/// Might be useful for compatibility reasons if we decide to add more things here.
SWIFT_PROTOCOL_NAMED("ExpoAppDelegateSubscriberProtocol")
@protocol EXAppDelegateSubscriberProtocol <UIApplicationDelegate>
@end

@class EXNativeModulesProxy;
@class EXModuleRegistry;

/// The classic bridge module that is responsible for:
/// <ul>
///   <li>
///     Creating and owning the <code>AppContext</code> when the Expo modules architecture is automatically initialized
///     by React Native (as opposed to native unit tests, where React Native is not used at all).
///   </li>
///   <li>
///     Installing the host object to the runtime.
///   </li>
/// </ul>
SWIFT_CLASS_NAMED("ExpoBridgeModule")
@interface ExpoBridgeModule : NSObject <RCTBridgeModule>
@property (nonatomic, readonly, strong) EXAppContext * _Nonnull appContext;
/// The initializer that is used by React Native when it loads bridge modules.
/// In this scenario, we create an <code>AppContext</code> that manages the
/// architecture of Expo modules and the app itself.
- (nonnull instancetype)init SWIFT_UNAVAILABLE;
+ (nonnull instancetype)new SWIFT_UNAVAILABLE_MSG("-init is unavailable");
+ (NSString * _Null_unspecified)moduleName SWIFT_WARN_UNUSED_RESULT;
+ (BOOL)requiresMainQueueSetup SWIFT_WARN_UNUSED_RESULT;
@property (nonatomic, strong) RCTBridge * _Null_unspecified bridge;
/// This should be called inside EXNativeModulesProxy.setBridge()
- (void)legacyProxyDidSetBridgeWithLegacyModulesProxy:(EXNativeModulesProxy * _Nonnull)legacyModulesProxy legacyModuleRegistry:(EXModuleRegistry * _Nonnull)legacyModuleRegistry;
@end

@protocol RCTBridgeDelegate;
@class UIView;
@class UIViewController;

/// An extensible react instance creation delegate. This class will loop through each <code>ExpoReactDelegateHandler</code> to determine the winner to create the instance.
SWIFT_CLASS("_TtC15ExpoModulesCore17ExpoReactDelegate")
@interface ExpoReactDelegate : NSObject
- (RCTBridge * _Nonnull)createBridgeWithDelegate:(id <RCTBridgeDelegate> _Nonnull)delegate launchOptions:(NSDictionary * _Nullable)launchOptions SWIFT_WARN_UNUSED_RESULT;
- (UIView * _Nonnull)createRootViewWithBridge:(RCTBridge * _Nonnull)bridge moduleName:(NSString * _Nonnull)moduleName initialProperties:(NSDictionary * _Nullable)initialProperties fabricEnabled:(BOOL)fabricEnabled SWIFT_WARN_UNUSED_RESULT;
- (UIViewController * _Nonnull)createRootViewController SWIFT_WARN_UNUSED_RESULT;
- (nonnull instancetype)init SWIFT_UNAVAILABLE;
+ (nonnull instancetype)new SWIFT_UNAVAILABLE_MSG("-init is unavailable");
@end

@class RCTRootView;

/// The handler for <code>ExpoReactDelegate</code>. A module can implement a handler to process react instance creation.
SWIFT_CLASS("_TtC15ExpoModulesCore24ExpoReactDelegateHandler")
@interface ExpoReactDelegateHandler : NSObject
- (nonnull instancetype)init OBJC_DESIGNATED_INITIALIZER;
/// If this module wants to handle <code>RCTBridge</code> creation, it can return the instance.
/// Otherwise return nil.
- (RCTBridge * _Nullable)createBridgeWithReactDelegate:(ExpoReactDelegate * _Nonnull)reactDelegate bridgeDelegate:(id <RCTBridgeDelegate> _Nonnull)bridgeDelegate launchOptions:(NSDictionary * _Nullable)launchOptions SWIFT_WARN_UNUSED_RESULT;
/// If this module wants to handle <code>RCTRootView</code> creation, it can return the instance.
/// Otherwise return nil.
- (RCTRootView * _Nullable)createRootViewWithReactDelegate:(ExpoReactDelegate * _Nonnull)reactDelegate bridge:(RCTBridge * _Nonnull)bridge moduleName:(NSString * _Nonnull)moduleName initialProperties:(NSDictionary * _Nullable)initialProperties SWIFT_WARN_UNUSED_RESULT;
/// If this module wants to handle <code>UIViewController</code> creation for <code>RCTRootView</code>, it can return the instance.
/// Otherwise return nil.
- (UIViewController * _Nullable)createRootViewControllerWithReactDelegate:(ExpoReactDelegate * _Nonnull)reactDelegate SWIFT_WARN_UNUSED_RESULT;
/// Callback before bridge creation
- (void)bridgeWillCreate;
/// Callback after bridge creation
- (void)bridgeDidCreateWithBridge:(RCTBridge * _Nonnull)bridge;
@end

@class NSCoder;

/// The view that extends <code>RCTView</code> which handles some styles (e.g. borders) and accessibility.
/// Inherit from <code>ExpoView</code> to keep this behavior and let your view use the associated <code>AppContext</code>.
SWIFT_CLASS("_TtC15ExpoModulesCore8ExpoView")
@interface ExpoView : RCTView
- (nullable instancetype)initWithCoder:(NSCoder * _Nonnull)coder OBJC_DESIGNATED_INITIALIZER SWIFT_UNAVAILABLE;
- (nonnull instancetype)initWithFrame:(CGRect)frame SWIFT_UNAVAILABLE;
@end





/// The default implementation for modules provider.
/// The proper implementation is generated by autolinking as part of <code>pod install</code> command.
SWIFT_CLASS("_TtC15ExpoModulesCore15ModulesProvider")
@interface ModulesProvider : NSObject
- (nonnull instancetype)init OBJC_DESIGNATED_INITIALIZER;
@end



/// Each module that has a view manager definition needs to be wrapped by <code>RCTViewManager</code>.
/// Unfortunately, we can’t use just one class because React Native checks for duplicated classes.
/// We’re generating its subclasses in runtime as a workaround.
SWIFT_CLASS("_TtC15ExpoModulesCore17ViewModuleWrapper")
@interface ViewModuleWrapper : RCTViewManager
/// The designated initializer that is used by React Native to create module instances.
/// Must be called on a dynamic class to get access to underlying wrapped module. Throws fatal exception otherwise.
- (nonnull instancetype)init OBJC_DESIGNATED_INITIALIZER;
/// Dummy initializer, for use only in <code>EXModuleRegistryAdapter.extraModulesForModuleRegistry:</code>.
- (nonnull instancetype)initWithDummy:(id _Nullable)dummy OBJC_DESIGNATED_INITIALIZER;
/// Returns the original name of the wrapped module.
- (NSString * _Nonnull)name SWIFT_WARN_UNUSED_RESULT;
/// Static function that returns the class name, but keep in mind that dynamic wrappers
/// have custom class name (see <code>objc_allocateClassPair</code> invocation in <code>createViewModuleWrapperClass</code>).
+ (NSString * _Nonnull)moduleName SWIFT_WARN_UNUSED_RESULT;
/// The view manager wrapper doesn’t require main queue setup — it doesn’t call any UI-related stuff on <code>init</code>.
/// Also, lazy-loaded modules must return false here.
+ (BOOL)requiresMainQueueSetup SWIFT_WARN_UNUSED_RESULT;
/// Creates a view from the wrapped module.
- (UIView * _Null_unspecified)view SWIFT_WARN_UNUSED_RESULT;
/// The config for <code>proxiedProperties</code> prop. In Objective-C style, this function is generated by <code>RCT_CUSTOM_VIEW_PROPERTY</code> macro.
+ (NSArray<NSString *> * _Nonnull)propConfig_proxiedProperties SWIFT_WARN_UNUSED_RESULT;
/// The setter for <code>proxiedProperties</code> prop. In Objective-C style, this function is generated by <code>RCT_CUSTOM_VIEW_PROPERTY</code> macro.
- (void)set_proxiedProperties:(id _Nonnull)json forView:(UIView * _Nonnull)view withDefaultView:(UIView * _Nonnull)defaultView;
/// Creates a subclass of <code>ViewModuleWrapper</code> in runtime. The new class overrides <code>moduleName</code> stub.
+ (SWIFT_METATYPE(ViewModuleWrapper) _Nullable)createViewModuleWrapperClassWithModule:(ViewModuleWrapper * _Nonnull)module_ SWIFT_WARN_UNUSED_RESULT;
@end

#endif
#if defined(__cplusplus)
#endif
#if __has_attribute(external_source_symbol)
# pragma clang attribute pop
#endif
#pragma clang diagnostic pop
#endif

#else
#error unsupported Swift architecture
#endif
