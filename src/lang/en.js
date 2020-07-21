export default {
  route: {
    dashboard: 'Dashboard',
    documentation: 'Documentation',
    guide: 'Guide',
    permission: 'Permission',
    pagePermission: 'Page Permission',
    rolePermission: 'Role Permission',
    directivePermission: 'Directive Permission',
    icons: 'Icons',
    components: 'Components',
    tinymce: 'Tinymce',
    markdown: 'Markdown',
    jsonEditor: 'JSON Editor',
    dndList: 'Dnd List',
    splitPane: 'SplitPane',
    avatarUpload: 'Avatar Upload',
    dropzone: 'Dropzone',
    sticky: 'Sticky',
    countTo: 'Count To',
    componentMixin: 'Mixin',
    backToTop: 'Back To Top',
    dragDialog: 'Drag Dialog',
    dragSelect: 'Drag Select',
    dragKanban: 'Drag Kanban',
    charts: 'Charts',
    keyboardChart: 'Keyboard Chart',
    lineChart: 'Line Chart',
    mixChart: 'Mix Chart',
    example: 'Example',
    nested: 'Nested Routes',
    menu1: 'Menu 1',
    'menu1-1': 'Menu 1-1',
    'menu1-2': 'Menu 1-2',
    'menu1-2-1': 'Menu 1-2-1',
    'menu1-2-2': 'Menu 1-2-2',
    'menu1-3': 'Menu 1-3',
    menu2: 'Menu 2',
    Table: 'Table',
    dynamicTable: 'Dynamic Table',
    dragTable: 'Drag Table',
    inlineEditTable: 'Inline Edit',
    complexTable: 'Complex Table',
    tab: 'Tab',
    form: 'Form',
    createArticle: 'Create Article',
    editArticle: 'Edit Article',
    articleList: 'Article List',
    errorPages: 'Error Pages',
    page401: '401',
    page404: '404',
    errorLog: 'Error Log',
    excel: 'Excel',
    exportExcel: 'Export Excel',
    selectExcel: 'Export Selected',
    mergeHeader: 'Merge Header',
    uploadExcel: 'Upload Excel',
    zip: 'Zip',
    pdf: 'PDF',
    exportZip: 'Export Zip',
    theme: 'Theme',
    clipboardDemo: 'Clipboard',
    i18n: 'I18n',
    externalLink: 'External Link',
    profile: 'Profile',
    system: 'System',
    userManage: 'User',
    roleManage: 'Role',
    permissionManage: 'Permission',
    dictionaryManage: 'Dictionary',
    loginLogManage: 'LoginLogManage',
    operateLogManage: 'OperateLogManage',
    parameterManage: 'ParameterManage',
    scheduleManage: 'ScheduleManage',
    joblogManage: 'JoblogManage',
    cmsManage: 'CMSManage',
    articleManage: 'ArticleManage',
    categoryManage: 'CategoryManage',
    departmentManage: 'DepartmentManage',
    sysMonitor: 'SystemMonitor',
    sqlMonitor: 'SqlMonitor',
    swaggerApi: 'SwaggerApi',
    generator: 'Generator',
    systemTool: 'SystemTool',
    memberManage: 'MemberManage',
    tagManage: 'TagManage',
    onlineUserManage: 'OnlineUserManage',
    wx_manage: 'WxManage',
    gzhAccountManage: 'GzhAccountManage',
    gzhUserManage: 'GzhUserManage',
    gzhUserTagManage: 'GzhUserTagManage',
    gzhFenweiTagManage: 'GzhFenweiTagManage',
    WxRuleManage: 'WxRuleManage',
    gzhTagManage: 'GzhTagManage',
    gzhTagRuleManage: 'GzhTagRuleManage',
    gzhTagSettingManage: 'GzhTagSettingManage',
    douyinManage: 'DouyinManage',
    douyinAccountManage: 'DouyinAccountManage',
    douyinFansManage: 'DouyinFansManage'
  },
  navbar: {
    dashboard: 'Dashboard',
    github: 'Github',
    logOut: 'Log Out',
    profile: 'Profile',
    theme: 'Theme',
    size: 'Global Size'
  },
  login: {
    title: 'Login Form',
    registerTitle: 'User Register',
    register: 'Register',
    logIn: 'Login',
    username: 'Username',
    password: 'Password',
    phone: 'Phone',
    any: 'any',
    thirdparty: 'Or connect with',
    thirdpartyTips: 'Can not be simulated on local, so please combine you own business simulation! ! !'
  },
  documentation: {
    documentation: 'Documentation',
    github: 'Github Repository'
  },
  permission: {
    addRole: 'New Role',
    editPermission: 'Edit',
    roles: 'Your roles',
    switchRoles: 'Switch roles',
    tips: 'In some cases, using v-permission will have no effect. For example: Element-UI  el-tab or el-table-column and other scenes that dynamically render dom. You can only do this with v-if.',
    delete: 'Delete',
    confirm: 'Confirm',
    cancel: 'Cancel'
  },
  routeInfo: {
    path: 'Path',
    component: 'Component',
    redirect: 'Redirect',
    name: 'Name',
    title: 'Title',
    icon: 'Icon',
    hidden: 'Hidden',
    cache: 'Cache',
    sort: 'Sort'
  },
  guide: {
    description: 'The guide page is useful for some people who entered the project for the first time. You can briefly introduce the features of the project. Demo is based on ',
    button: 'Show Guide'
  },
  components: {
    documentation: 'Documentation',
    tinymceTips: 'Rich text is a core feature of the management backend, but at the same time it is a place with lots of pits. In the process of selecting rich texts, I also took a lot of detours. The common rich texts on the market have been basically used, and I finally chose Tinymce. See the more detailed rich text comparison and introduction.',
    dropzoneTips: 'Because my business has special needs, and has to upload images to qiniu, so instead of a third party, I chose encapsulate it by myself. It is very simple, you can see the detail code in @/components/Dropzone.',
    stickyTips: 'when the page is scrolled to the preset position will be sticky on the top.',
    backToTopTips1: 'When the page is scrolled to the specified position, the Back to Top button appears in the lower right corner',
    backToTopTips2: 'You can customize the style of the button, show / hide, height of appearance, height of the return. If you need a text prompt, you can use element-ui el-tooltip elements externally',
    imageUploadTips: 'Since I was using only the vue@1 version, and it is not compatible with mockjs at the moment, I modified it myself, and if you are going to use it, it is better to use official version.'
  },
  table: {
    dynamicTips1: 'Fixed header, sorted by header order',
    dynamicTips2: 'Not fixed header, sorted by click order',
    dragTips1: 'The default order',
    dragTips2: 'The after dragging order',
    title: 'Title',
    importance: 'Imp',
    type: 'Type',
    remark: 'Remark',
    search: 'Search',
    add: 'Add',
    export: 'Export',
    reviewer: 'reviewer',
    id: 'ID',
    date: 'Date',
    author: 'Author',
    readings: 'Readings',
    status: 'Status',
    actions: 'Actions',
    edit: 'Edit',
    show: 'Show',
    publish: 'Publish',
    draft: 'Draft',
    delete: 'Delete',
    cancel: 'Cancel',
    confirm: 'Confirm',
    batchDelete: 'Batch Delete',
    batchRun: 'Batch Run',
    batchPause: 'Batch Pause',
    batchResume: 'Batch Resume',
    batchReset: 'Batch Reset',
    jobRun: 'Job Run',
    jobPause: 'Job Pause',
    jobResume: 'Job Resume',
    reset: 'Reset',
    jobLog: 'Job Log',
    goBack: 'Go Back',
    addChildren: 'Add Children',
    changePassword: 'Change Password',
    batchAddUser: 'Batch AddUsers',
    fuzzySearch: 'Fuzzy Search',
    download: 'Download',
    config: 'Config',
    batchSave: 'Batch Save',
    kickOutUser: 'KickOut User',
    fullSync: 'Full Sync',
    incrSync: 'Incr Sync',
    analyseTag: 'Analyse Tag',
    downloadWxUser: 'Download WxUser',
    set_default: 'Default'
  },
  example: {
    warning: 'Creating and editing pages cannot be cached by keep-alive because keep-alive include does not currently support caching based on routes, so it is currently cached based on component name. If you want to achieve a similar caching effect, you can use a browser caching scheme such as localStorage. Or do not use keep-alive include to cache all pages directly. See details'
  },
  errorLog: {
    tips: 'Please click the bug icon in the upper right corner',
    description: 'Now the management system are basically the form of the spa, it enhances the user experience, but it also increases the possibility of page problems, a small negligence may lead to the entire page deadlock. Fortunately Vue provides a way to catch handling exceptions, where you can handle errors or report exceptions.',
    documentation: 'Document introduction'
  },
  excel: {
    export: 'Export',
    selectedExport: 'Export Selected Items',
    placeholder: 'Please enter the file name (default excel-list)'
  },
  zip: {
    export: 'Export',
    placeholder: 'Please enter the file name (default file)'
  },
  pdf: {
    tips: 'Here we use window.print() to implement the feature of downloading PDF.'
  },
  theme: {
    change: 'Change Theme',
    documentation: 'Theme documentation',
    tips: 'Tips: It is different from the theme-pick on the navbar is two different skinning methods, each with different application scenarios. Refer to the documentation for details.'
  },
  tagsView: {
    refresh: 'Refresh',
    close: 'Close',
    closeOthers: 'Close Others',
    closeAll: 'Close All'
  },
  settings: {
    title: 'Page style setting',
    theme: 'Theme Color',
    tagsView: 'Open Tags-View',
    fixedHeader: 'Fixed Header',
    sidebarLogo: 'Sidebar Logo',
    uniqueOpened: 'Unique Opened'
  },
  userInfo: {
    id: 'User ID',
    username: 'User Name',
    password: 'Password',
    phone: 'Phone',
    status: 'User Status',
    headImgUrl: 'Head Image',
    createTime: 'Create Time',
    roleNames: 'Role Names',
    deptName: 'Dept Name',
    loginCount: 'Login Count',
    lastLoginTime: 'Last Login Time'
  },
  roleInfo: {
    id: 'Role ID',
    roleName: 'Role Name',
    description: 'Description',
    status: 'Role Status',
    createTime: 'Create Time',
    permsList: 'Role Perms',
    deptList: 'Data Perms',
    userCount: 'User Count'
  },
  permissionInfo: {
    id: 'Permission ID',
    parentId: 'Parent ID',
    permissionName: 'Permission Name',
    permissionString: 'Permission String',
    description: 'description',
    type: 'Permission Type',
    status: 'Permission Status',
    createTime: 'Create Time',
    upMenus: 'Up Menus'
  },
  dictionaryInfo: {
    id: 'Dictionary ID',
    code: 'Code',
    value: 'Value',
    label: 'Label',
    sort: 'Sort',
    description: 'Description',
    status: 'Status',
    createTime: 'Create Time'
  },
  operateLogInfo: {
    userName: 'User Name',
    busType: 'Bus Type',
    operateType: 'Operate Type',
    operateDetail: 'Operate Detail',
    operateTime: 'Operate Time'
  },
  loginLogInfo: {
    userName: 'User Name',
    ip: 'Login Ip',
    loginTime: 'Login Time',
    userAgent: 'User Agent'
  },
  contentMessage: {
    roleMsg: 'Roles can be multiple, and end-user permissions are the intersection of multiple roles',
    roleLabel: 'Role',
    select: 'please choose'
  },
  parameterInfo: {
    buttonName: 'Update',
    sysParams: 'Sys Params',
    title: 'Title',
    url: 'Url',
    keywords: 'Keywords',
    description: 'Description',
    code: 'Code',
    copyright: 'Copyright',
    slideshow: 'SlideShow',
    ad: 'Ad',
    logo: 'Logo',
    headImgUrl: 'Head Img Url',
    qiniuUpload: 'Qiniu Upload',
    bucket: 'Bucket',
    secretKey: 'SecretKey',
    accessKey: 'AccessKey',
    downloadUrl: 'Download Url',
    fileMaxSize: 'File Max Size',
    expireSeconds: 'Expire Seconds',
    defaultSet: 'Default Set',
    roleName: 'Default User Role'
  },
  jobInfo: {
    beanName: 'Bean Name',
    methodName: 'Method Name',
    params: 'Parameters',
    status: 'Status',
    count: 'Failure Num',
    remark: 'Remark',
    error: 'Error Info',
    cronExpression: 'Cron Expression',
    executeTime: 'Execute Time(ms)',
    startTime: 'Start Time',
    endTime: 'End Time',
    createTime: 'Create Time'
  },
  articleInfo: {
    title: 'Title',
    summary: 'Summary',
    content: 'Content',
    sourceUrl: 'SourceUrl',
    imageUrl: 'Image Url',
    author: 'Author',
    publishTime: 'Publish Time',
    publishStatus: 'Publish Status',
    clicks: 'Clicks',
    likes: 'Likes',
    sort: 'Sort',
    recommend: 'Recommend',
    createTime: 'Create Time',
    updateTime: 'Update Time',
    articleCategory: 'Article Category'
  },
  categoryInfo: {
    categoryName: 'Category Name',
    parentId: 'Parent Id',
    redirectUrl: 'Redirect Url',
    icon: 'Icon',
    sort: 'Sort',
    status: 'Status',
    remark: 'Remark',
    createTime: 'Create Time',
    upMenus: 'Up Menus'
  },
  departmentInfo: {
    id: 'ID',
    deptName: 'Dep Name',
    userCount: 'User Count',
    sort: 'sort',
    upMenus: 'Up Dep'
  },
  tableInfo: {
    tableName: 'Table Name',
    engine: 'Engine',
    encoding: 'Encoding',
    comment: 'Comment',
    createTime: 'Create Time'
  },
  columnInfo: {
    columnName: 'Column Name',
    columnType: 'Column Type',
    comment: 'Comment'
  },
  Member: {
    id: 'Id',
    name: 'Name',
    sex: 'Sex',
    status: 'Status',
    createTime: 'CreateTime',
    nickname: 'Nickname',
    headImg: 'HeadImg',
    loginTime: 'LoginTime'
  },
  Tag: {
    id: 'Id',
    tagName: 'TagName',
    num: 'Num',
    hot: 'Hot',
    createBy: 'CreateBy',
    createTime: 'CreateTime',
    updateBy: 'UpdateBy',
    updateTime: 'UpdateTime'
  },
  onlineUserInfo: {
    username: '用户名称',
    host: 'IP',
    sessionId: '会话ID',
    startTimestamp: '创建时间',
    lastAccessTime: '最后活跃时间',
    timeout: '超时（小时）'
  },
  GzhAccount: {
    id: 'Id',
    jwid: 'Jwid',
    wxName: 'WxName',
    loginName: 'LoginName',
    loginPasswd: 'LoginPasswd',
    applicationType: 'ApplicationType',
    qrcodeimg: 'Qrcodeimg',
    weixinNumber: 'WeixinNumber',
    weixinAppid: 'WeixinAppid',
    weixinAppsecret: 'WeixinAppsecret',
    fwAppid: 'FWAppId',
    fwAppsecret: 'FWAppSecret',
    fwField: 'Field',
    accountType: 'AccountType',
    authStatus: 'AuthStatus',
    accessToken: 'AccessToken',
    tokenGettime: 'TokenGettime',
    apiticket: 'Apiticket',
    defaultAccount: 'Default',
    apiticketGettime: 'ApiticketGettime',
    jsapiticket: 'Jsapiticket',
    jsapiticketGettime: 'JsapiticketGettime',
    authType: 'AuthType',
    businessInfo: 'BusinessInfo',
    funcInfo: 'FuncInfo',
    nickName: 'NickName',
    headimgurl: 'Headimgurl',
    authorizationInfo: 'AuthorizationInfo',
    authorizerRefreshToken: 'AuthorizerRefreshToken',
    token: 'Token',
    authorizationStatus: 'AuthorizationStatus',
    isDeleted: 'IsDeleted',
    tenantId: 'TenantId',
    createBy: 'CreateBy',
    createTime: 'CreateTime',
    updateBy: 'UpdateBy',
    updateTime: 'UpdateTime'
  },
  GzhUser: {
    id: 'Id',
    openId: 'OpenId',
    nickname: 'Nickname',
    nicknameTxt: 'NicknameTxt',
    remark: 'Remark',
    headImgUrl: 'HeadImgUrl',
    sexDesc: 'SexDesc',
    sex: 'Sex',
    subscribe: 'Subscribe',
    subscribeTime: 'SubscribeTime',
    subscribeScene: 'SubscribeScene',
    mobile: 'Mobile',
    bindStatus: 'BindStatus',
    bindTime: 'BindTime',
    tagIds: 'TagIds',
    fenWeiTags: 'FenWeiTags',
    province: 'Province',
    city: 'City',
    country: 'Country',
    qrScene: 'QrScene',
    qrSceneStr: 'QrSceneStr',
    groupId: 'GroupId',
    language: 'Language',
    unionId: 'UnionId',
    jwid: 'Jwid',
    isDeleted: 'IsDeleted',
    tenantId: 'TenantId',
    createBy: 'CreateBy',
    createTime: 'CreateTime',
    updateBy: 'UpdateBy',
    updateTime: 'UpdateTime'
  },
  GzhUserTag: {
    id: 'Id',
    gzhId: 'GzhId',
    industryId: 'IndustryId',
    fenweiName: 'FenweiName',
    threshold: 'Threshold',
    reliability: 'Reliability',
    tagid: 'Tagid',
    name: 'Name',
    jwid: 'Jwid',
    count: 'Count',
    synctime: 'Synctime',
    isDeleted: 'IsDeleted',
    tenantId: 'TenantId',
    createBy: 'CreateBy',
    createTime: 'CreateTime',
    updateBy: 'UpdateBy',
    updateTime: 'UpdateTime'
  },
  GzhFenweiTag: {
    id: 'Id',
    gzhId: 'GzhId',
    openId: 'OpenId',
    fieldId: 'FieldId',
    name: 'Name',
    content: 'Content',
    rank: 'Rank',
    score: 'Score',
    createBy: 'CreateBy',
    createTime: 'CreateTime',
    updateBy: 'UpdateBy',
    updateTime: 'UpdateTime'
  },
  GzhTag: {
    id: 'Id',
    wxTagId: 'WxTagId',
    name: 'Name',
    description: 'Desc',
    createBy: 'CreateBy',
    createTime: 'CreateTime',
    updateBy: 'UpdateBy',
    updateTime: 'UpdateTime'
  },
  GzhTagRule: {
    id: 'Id',
    rid: 'Rid',
    score: 'Score',
    compute: 'Compute',
    content: 'Content',
    tagId: 'TagId',
    gzhId: 'GzhId',
    createBy: 'CreateBy',
    createTime: 'CreateTime',
    updateBy: 'UpdateBy',
    updateTime: 'UpdateTime'
  }
}
