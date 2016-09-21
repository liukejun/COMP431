//
// Inclass Virtual DOM Exercise
// ============================
//
// You need to implement createElement() and updateElement()
//
;(function(exports) {

'use strict'

function h(tag, props, ...children) {
    return { tag, props: props ? props : { }, 
        children: Array.isArray(children[0]) ? children[0] : children }
}

function createElement(node) {
	console.log('Create element called for', node);
    var element = document.createElement(node.tag);
    console.log(element)
    for (let m in node.props){
        if (m=="className"){
            element.setAttribute("class", node.props[m]);
        }
        element.setAttribute(m, node.props[m]);
        console.log(element)
    }
    if (node.children!=null){
        for (let childIndex in node.children){
            if (node.children[childIndex] instanceof Object){
                var child = createElement(node.children[childIndex]);
                element.appendChild(child);
                console.log("go to children")
            } else {
                var text = document.createTextNode(node.children[childIndex]);
                element.appendChild(text);
            }
            
        }
    } else {
        console.log("back to parent")
        return element;
    }
	// create the element and return it to the caller
	// the node might have event listeners that need to be registered
	// the node might have children that need to be created as well
	return element;
}

function changed(node1, node2) {
    return typeof node1 !== typeof node2 ||
            (typeof node1 === 'string' && node1 !== node2) ||
            node1.tag !== node2.tag ||
            (node1.props && node2.props && 
            	node1.props.id && node2.props.id && 
            	node1.props.id != node2.props.id)
}

function updateElement(parent, newNode, oldNode, index=0) {
	// index will be needed when you traverse children
	// add the new node to the parent DOM element if
	// the new node is different from the old node 
	// at the same location in the DOM.
	// ideally we also handle inserts, but ignore that functionality for now.

    if (!oldNode) {
        parent.appendChild(createElement(newNode))
    } else {
    	console.log('update element that may have changed')
    	// you can use my changed(node1, node2) method above
    	// to determine if an element has changed or not

    	// be sure to also update the children!
    }
}

const deepCopy = (obj) => {
    if (obj === null || typeof(obj) !== 'object')
        return obj;
    const props = {}
    if (obj.props) {
        //console.log(obj.tag+","+obj.props)
        for (let p in obj.props) {
            props[p] = obj.props[p]

        }
    }
    return h(obj.tag, props,
        Array.isArray(obj.children) ? obj.children.map(deepCopy) : obj.children)
}

const update = () => requestAnimationFrame(() => {
	// compare the current vdom with the original vdom for updates
    updateElement(h.mounted.root, h.mounted.current, h.mounted.original)
    h.mounted.original = deepCopy(h.mounted.current)
})

h.mount = (root, component) => {
    // we keep a copy of the original virtual DOM so we can diff it later for updates
    const originalComponent = deepCopy(component)
    h.mounted = { root: root, current: component, original: originalComponent }
    updateElement(root, originalComponent)
}

exports.h = h

})(window);