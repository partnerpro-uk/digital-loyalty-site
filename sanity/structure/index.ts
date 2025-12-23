import type { StructureResolver, StructureBuilder, ListItemBuilder } from 'sanity/structure';

// Language configuration
const languages = [
  { code: 'en', title: 'English', icon: '🇺🇸' },
  { code: 'es', title: 'Spanish', icon: '🇪🇸' },
  { code: 'fr', title: 'French', icon: '🇫🇷' },
  { code: 'pt', title: 'Portuguese', icon: '🇵🇹' },
  { code: 'de', title: 'German', icon: '🇩🇪' },
  { code: 'ar', title: 'Arabic', icon: '🇸🇦' },
  { code: 'zh', title: 'Chinese', icon: '🇨🇳' }
];

// Helper: Create language-grouped document list
function createLanguageList(
  S: StructureBuilder,
  type: string,
  title: string,
  idPrefix: string,
  defaultOrdering: Array<{ field: string; direction: 'asc' | 'desc' }> = [{ field: 'order', direction: 'asc' }]
): ListItemBuilder[] {
  return [
    ...languages.map((lang) =>
      S.listItem()
        .title(lang.title)
        .id(`${idPrefix}-${lang.code}`)
        .icon(() => lang.icon)
        .child(
          S.documentList()
            .title(`${lang.title} ${title}`)
            .id(`${idPrefix}-${lang.code}-list`)
            .filter(`_type == "${type}" && language == "${lang.code}"`)
            .defaultOrdering(defaultOrdering)
        )
    ),
    S.divider(),
    S.listItem()
      .title('All')
      .id(`${idPrefix}-all`)
      .icon(() => '📊')
      .child(
        S.documentList()
          .title(`All ${title}`)
          .id(`${idPrefix}-all-list`)
          .filter(`_type == "${type}"`)
          .defaultOrdering([{ field: 'language', direction: 'asc' }, ...defaultOrdering])
      )
  ];
}

// Page list for pageContent
const pages = [
  { id: 'home', title: 'Home Page' },
  { id: 'about', title: 'About Page' },
  { id: 'pricing', title: 'Pricing Page' },
  { id: 'contact', title: 'Contact Page' },
  { id: 'features', title: 'Features Page' }
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // ═══════════════════════════════════════════
      // SITE SETTINGS (Singleton)
      // ═══════════════════════════════════════════
      S.listItem()
        .title('Site Settings')
        .id('site-settings')
        .icon(() => '⚙️')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings')
        ),

      S.divider(),

      // ═══════════════════════════════════════════
      // PAGE CONTENT
      // ═══════════════════════════════════════════
      S.listItem()
        .title('Pages')
        .id('pages')
        .icon(() => '📄')
        .child(
          S.list()
            .title('Pages')
            .id('pages-list')
            .items([
              ...pages.map((page) =>
                S.listItem()
                  .title(page.title)
                  .id(`page-${page.id}`)
                  .icon(() => '📑')
                  .child(
                    S.documentList()
                      .title(`${page.title} Translations`)
                      .id(`page-${page.id}-list`)
                      .filter(`_type == "pageContent" && pageId == "${page.id}"`)
                      .defaultOrdering([{ field: 'language', direction: 'asc' }])
                  )
              ),
              S.divider(),
              S.listItem()
                .title('All Page Content')
                .id('pages-all')
                .icon(() => '📊')
                .child(
                  S.documentList()
                    .title('All Page Content')
                    .id('pages-all-list')
                    .filter('_type == "pageContent"')
                    .defaultOrdering([{ field: 'pageId', direction: 'asc' }, { field: 'language', direction: 'asc' }])
                )
            ])
        ),

      // ═══════════════════════════════════════════
      // NAVIGATION & FOOTER
      // ═══════════════════════════════════════════
      S.listItem()
        .title('Navigation')
        .id('navigation')
        .icon(() => '🧭')
        .child(
          S.list()
            .title('Navigation by Language')
            .id('navigation-list')
            .items(
              createLanguageList(S, 'navigation', 'Navigation', 'nav', [])
            )
        ),

      S.listItem()
        .title('Footer')
        .id('footer')
        .icon(() => '🦶')
        .child(
          S.list()
            .title('Footer by Language')
            .id('footer-list')
            .items(
              createLanguageList(S, 'footer', 'Footer', 'footer', [])
            )
        ),

      S.divider(),

      // ═══════════════════════════════════════════
      // DYNAMIC CONTENT
      // ═══════════════════════════════════════════
      S.listItem()
        .title('Testimonials')
        .id('testimonials')
        .icon(() => '💬')
        .child(
          S.list()
            .title('Testimonials by Language')
            .id('testimonials-list')
            .items([
              ...createLanguageList(S, 'testimonial', 'Testimonials', 'testimonials', [
                { field: 'featured', direction: 'desc' },
                { field: 'order', direction: 'asc' }
              ]),
              S.listItem()
                .title('Featured')
                .id('testimonials-featured')
                .icon(() => '⭐')
                .child(
                  S.documentList()
                    .title('Featured Testimonials')
                    .id('testimonials-featured-list')
                    .filter('_type == "testimonial" && featured == true')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                )
            ])
        ),

      S.listItem()
        .title('FAQ')
        .id('faq')
        .icon(() => '❓')
        .child(
          S.list()
            .title('FAQ by Language')
            .id('faq-list')
            .items(
              createLanguageList(S, 'faqItem', 'FAQ', 'faq', [
                { field: 'category', direction: 'asc' },
                { field: 'order', direction: 'asc' }
              ])
            )
        ),

      S.listItem()
        .title('Client Logos')
        .id('client-logos')
        .icon(() => '🏢')
        .schemaType('clientLogo')
        .child(
          S.documentTypeList('clientLogo')
            .id('client-logos-list')
            .title('Client Logos (Social Proof)')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),

      S.listItem()
        .title('Pricing Plans')
        .id('pricing-plans')
        .icon(() => '💰')
        .child(
          S.list()
            .title('Pricing by Language')
            .id('pricing-list')
            .items(
              createLanguageList(S, 'pricingPlan', 'Pricing Plans', 'pricing', [{ field: 'order', direction: 'asc' }])
            )
        ),

      S.divider(),

      // ═══════════════════════════════════════════
      // LEAD CAPTURE & FORMS
      // ═══════════════════════════════════════════
      S.listItem()
        .title('Lead Capture')
        .id('lead-capture')
        .icon(() => '📝')
        .child(
          S.list()
            .title('Lead Capture')
            .id('lead-capture-list')
            .items([
              S.listItem()
                .title('Forms')
                .id('lead-forms')
                .icon(() => '📋')
                .child(
                  S.list()
                    .title('Forms by Language')
                    .id('lead-forms-list')
                    .items(
                      createLanguageList(S, 'leadForm', 'Forms', 'lead-form', [{ field: 'formId', direction: 'asc' }])
                    )
                ),
              S.listItem()
                .title('Submissions')
                .id('lead-submissions')
                .icon(() => '📬')
                .child(
                  S.list()
                    .title('Submissions')
                    .id('lead-submissions-list')
                    .items([
                      S.listItem()
                        .title('All Submissions')
                        .id('submissions-all')
                        .icon(() => '📊')
                        .child(
                          S.documentList()
                            .title('All Submissions')
                            .id('submissions-all-list')
                            .filter('_type == "leadSubmission"')
                            .defaultOrdering([{ field: 'submittedAt', direction: 'desc' }])
                        ),
                      S.listItem()
                        .title('New Leads')
                        .id('submissions-new')
                        .icon(() => '🆕')
                        .child(
                          S.documentList()
                            .title('New Leads')
                            .id('submissions-new-list')
                            .filter('_type == "leadSubmission" && status == "new"')
                            .defaultOrdering([{ field: 'submittedAt', direction: 'desc' }])
                        ),
                      S.listItem()
                        .title('Contacted')
                        .id('submissions-contacted')
                        .icon(() => '📞')
                        .child(
                          S.documentList()
                            .title('Contacted Leads')
                            .id('submissions-contacted-list')
                            .filter('_type == "leadSubmission" && status == "contacted"')
                            .defaultOrdering([{ field: 'submittedAt', direction: 'desc' }])
                        ),
                      S.listItem()
                        .title('Converted')
                        .id('submissions-converted')
                        .icon(() => '✅')
                        .child(
                          S.documentList()
                            .title('Converted Leads')
                            .id('submissions-converted-list')
                            .filter('_type == "leadSubmission" && status == "converted"')
                            .defaultOrdering([{ field: 'submittedAt', direction: 'desc' }])
                        )
                    ])
                )
            ])
        ),

      S.divider(),

      // ═══════════════════════════════════════════
      // BLOG
      // ═══════════════════════════════════════════
      S.listItem()
        .title('Blog')
        .id('blog')
        .icon(() => '📝')
        .child(
          S.list()
            .title('Blog')
            .id('blog-main')
            .items([
              S.listItem()
                .title('Posts')
                .id('blog-posts')
                .icon(() => '📰')
                .child(
                  S.list()
                    .title('Posts by Language')
                    .id('blog-posts-list')
                    .items([
                      ...createLanguageList(S, 'blogPost', 'Posts', 'blog', [
                        { field: 'featured', direction: 'desc' },
                        { field: 'publishedAt', direction: 'desc' }
                      ]),
                      S.listItem()
                        .title('Featured')
                        .id('blog-featured')
                        .icon(() => '⭐')
                        .child(
                          S.documentList()
                            .title('Featured Posts')
                            .id('blog-featured-list')
                            .filter('_type == "blogPost" && featured == true')
                            .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                        )
                    ])
                ),
              S.listItem()
                .title('Categories')
                .id('blog-categories')
                .icon(() => '📁')
                .schemaType('category')
                .child(S.documentTypeList('category').id('category-list').title('Categories')),
              S.listItem()
                .title('Tags')
                .id('blog-tags')
                .icon(() => '🏷️')
                .schemaType('tag')
                .child(S.documentTypeList('tag').id('tag-list').title('Tags')),
              S.listItem()
                .title('Authors')
                .id('blog-authors')
                .icon(() => '👤')
                .schemaType('author')
                .child(S.documentTypeList('author').id('author-list').title('Authors')),
              S.listItem()
                .title('Templates')
                .id('blog-templates')
                .icon(() => '📋')
                .schemaType('blogTemplate')
                .child(S.documentTypeList('blogTemplate').id('template-list').title('Blog Templates'))
            ])
        ),
    ]);
