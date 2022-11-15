# GCTools

Command line utilities for working with Ghost content.


## Install

1. `git clone` this repo & `cd` into it as usual
2. Run `yarn` to install top-level dependencies.
3. To make `gctools` accessible globally, run `yarn link`


## Usage

To see all available tools:

```sh
gctools
```


### Interactive Mode

GCTools has an interactive mode which walks you through each tool, without needing to manually type multiple option flags.

```sh
gctools i
```

Available tools include:

* [`zip-split`](#zip-split)
* [`zip-create`](#zip-create)
* [`json-split`](#json-split)
* [`fetch-images`](#fetch-images)
* [`dedupe-members-csv`](#dedupe-members-csv)
* [`random-posts`](#random-posts)
* [`delete-posts`](#delete-posts)
* [`add-tags`](#add-tags)
* [`combine-tags`](#combine-tags)
* [`add-preview`](#add-preview)
* [`delete-tags`](#delete-tags)
* [`delete-unused-tags`](#delete-unused-tags)
* [`find-replace`](#find-replace)
* [`change-author`](#change-author)
* [`change-visibility`](#change-visibility)
* [`change-status`](#change-status)
* [`delete-members`](#delete-members)
* [`change-role`](#change-role)
* [`add-member-newsletter-subscription`](#add-member-newsletter-subscription)
* [`remove-member-newsletter-subscription`](#remove-member-newsletter-subscription)

Each of the tools also has a traditional CLI counterpart with more options, detailed below.


### zip-split

Split a zip file into smaller zip files of a defined maximum size, while maintaining the directory structure.

```sh
# See all available options
gctools zip-split --help

# Split a zip file into as many files needed for them to all be 50mb or below
gctools zip-split /path/to/big-file.zip -M 50
```


### zip-create

Split a large directory into smaller directories of a defined maximum size and zip each, while maintaining the directory structure.

```sh
# See all available options
gctools zip-create --help

# Split a large directory into as many files needed for them to all be 50mb or below
gctools zip-create /path/to/big-directory -M 50
```


### json-split

Split a large JSON file into smaller JSON files of a defined maximum size, while retaining meta, tag, and author information.

```sh
# See all available options
gctools json-split --help

# Split a JSON file into as many files needed for them to hax a maximum of 50 posts per file
gctools json-split /path/to/big-file.json --M 50
```


### fetch-images

Download all available images from a valid Ghost JSON file create a JSON file with updated image references

```sh
# See all available options
gctools fetch-images --help

# Fetch images from a valid Ghost JSON file, with `https://example.com` as the base URL
gctools fetch-images /path/to/file.json https://example.com
```


### dedupe-members-csv

Create new CSV files that only contain new or updated members, by comparing the existing members with the output from the output from [`@tryghost/migrate`](https://github.com/TryGhost/migrate/tree/main/packages/mg-substack-members-csv).

```sh
# See all available options
gctools dedupe-members-csv --help

gctools dedupe-members-csv <existing-members> [new-free] [new-comp] [new-paid]
```


### random-posts

Insert a number of posts with random content.

```sh
# See all available options
gctools random-posts --help

# Create and insert 10 random posts
gctools random-posts <apiURL> <adminAPIKey>

# Create and insert 3000 random draft posts with 2 tags visible to members only, written by a specific author
gctools random-posts <apiURL> <adminAPIKey> --count 3000 --tag '#random,New World' --status draft --visibility members --userEmail person@dummyemail.com
```


### delete-posts

Delete all content or content with a specific set of filters, which can be combined.

```sh
# See all available options
gctools delete-posts --help

# Delete all posts (⛔️ dangerous!)
gctools delete-posts <apiURL> <adminAPIKey>

# Delete all posts with a specific tag
gctools delete-posts <apiURL> <adminAPIKey> --tag 'hash-testing'

# Delete all posts by a specific author
gctools delete-posts <apiURL> <adminAPIKey> --author 'sample-user'

# Delete all posts by a specific author with a specific tag
gctools delete-posts <apiURL> <adminAPIKey> --author 'sample-user' --tag '#testing'
```


### add-tags

Add a tag to specific posts and pages with a specific set of filters

```sh
# Add a tag of 'Testing' to all posts and pages
gctools add-tags <apiURL> <adminAPIKey> --new_tags 'Testing'

# Add a tag of 'Testing' to all posts and pages (same result as above)
gctools add-tags <apiURL> <adminAPIKey> --new_tags 'Testing' --type posts pages

# Add a tag of 'Testing' to all posts only
gctools add-tags <apiURL> <adminAPIKey> --new_tags 'Testing' --type posts

# Add a tag of 'Testing' to all pages only
gctools add-tags <apiURL> <adminAPIKey> --new_tags 'Testing' --type pages

# Add a tag of 'Testing' to all public posts and pages
gctools add-tags <apiURL> <adminAPIKey> --visibility public --new_tags 'Testing'

# Add a tag of 'Testing' to all members-only posts and pages that also have a tag of 'hello'
gctools add-tags <apiURL> <adminAPIKey> --visibility public --tag 'hello' --new_tags 'Testing'

# Add a tag of 'Testing' to all members-only posts and pages that also have a tag of 'hello', and are by written by 'harry'
gctools add-tags <apiURL> <adminAPIKey> --visibility public --tag 'hello' --author 'harry' --new_tags 'Testing'
```

### combine-tags

Combine tags by adding the `target` tag to all posts that hav any of the `incorporate` tags. For example, posts with the `posts`, `newsletter`, and `blogs` tags will have the `articles` added to it.

```sh
gctools combine-tags <apiURL> <adminAPIKey> <jsonFile>
```

The `<jsonFile>` file needs to follow the format below, with slugs used as the values.

```json
[
    {
        "target": "articles",
        "incorporate": [
            "posts",
            "newsletter",
            "blogs"
        ]
    },
    {
        "target": "media",
        "incorporate": [
            "podcasts",
            "video"
        ]
    }
]
```


### add-preview

Insert a public preview divider at a specific point, after the `previewPosition` number.

```sh
# Add a divider to all posts as position 2
gctools add-preview <apiURL> <adminAPIKey> --previewPosition 2

# Add a divider to all posts as position 2 for members-only posts
gctools add-preview <apiURL> <adminAPIKey> --visibility members --previewPosition 2

# Add a divider to all posts as position 2 for paid posts
gctools add-preview <apiURL> <adminAPIKey> --visibility paid --previewPosition 2

# Add a divider to all posts as position 2 for paid posts that also have a tag of `hello`
gctools add-preview <apiURL> <adminAPIKey> --visibility paid --tag hello --previewPosition 2

# Add a divider to all posts as position 2 for paid posts that also have a tag of `hello`, and are by written by `harry`
gctools add-preview <apiURL> <adminAPIKey> --visibility paid --tag hello --author harry --previewPosition 2
```


### delete-tags

Delete tags, but not the content that uses that tag

```sh
# See all available options
gctools delete-tags --help

# Delete a specific tag or multiple tags
gctools delete-tags <apiURL> <adminAPIKey> --tags hash-gctools, test 1
```


### delete-unused-tags

Delete tags that have no or a low number of associated posts

```sh
# See all available options
gctools delete-unused-tags --help

# Delete a specific tag or multiple tags
gctools delete-unused-tags <apiURL> <adminAPIKey>

# Delete a specific tag or multiple tags
gctools delete-unused-tags <apiURL> <adminAPIKey> --maxPostCount 3
```


### find-replace

Find & replace strings of text within Ghost posts

```sh
# See all available options
gctools find-replace --help

# Replace a string but only in the `mobiledoc` and `title`
gctools find-replace <apiURL> <adminAPIKey> --find 'Old text' --replace 'New text' --where mobiledoc,title

# Replace a string in all available fields
gctools find-replace <apiURL> <adminAPIKey> --find 'Old text' --replace 'New text' --where all
```

Available `where` fields are:

* `all`
* `mobiledoc` (default)
* `title`
* `slug`
* `custom_excerpt`
* `meta_title`
* `meta_description`
* `twitter_title`
* `twitter_description`
* `og_title`
* `og_description`


### change-author

Change the author assigned to a post

```sh
# See all available options
gctools change-author --help

# Change the posts written by `richard` and assign to `michael`
gctools change-author <apiURL> <adminAPIKey> --author 'richard' --new_author 'michael'
```


### change-visibility

Change the visibility of posts

```sh
# See all available options
gctools change-visibility --help

# Change the posts that are currently public to be members-only
gctools change-visibility <apiURL> <adminAPIKey> --visibility 'public' --new_visibility 'members'

# Change the posts that are currently members-only to be paid-members only
gctools change-visibility <apiURL> <adminAPIKey> --visibility 'members' --new_visibility 'paid'

# Change the posts tagged with 'news' to be paid-members only
gctools change-visibility <apiURL> <adminAPIKey> --tag 'news' --new_visibility 'paid'

# Change the posts tagged with 'news', and written by 'jane' to be paid-members only
gctools change-visibility <apiURL> <adminAPIKey> --tag 'news' --author 'jane' --new_visibility 'paid'
```


### change-status

Change the status of posts

```sh
# See all available options
gctools change-status --help

# Change the posts that are currently drafts to be public
gctools change-status <apiURL> <adminAPIKey> --status 'draft' --new_status 'published'

# Change the posts that are currently drafts with the tag `news` to be public
gctools change-status <apiURL> <adminAPIKey> --status 'draft' --tag 'news' --new_status 'published'
```


### delete-members

Delete all members

```sh
# See all available options
gctools delete-members --help

# Change the posts written by `richard` and assign to `michael`
gctools delete-members <apiURL> <adminAPIKey>
```


### change-role

Change the staff user role (requires a staff user token) [Ghost >= 5.2.0]

```sh
# See all available options
gctools change-role <apiURL> <adminAPIKey> --help

# Change all staff users (except the site owner) to have the Contributor role
gctools change-role <apiURL> <adminAPIKey> --newRole 'Contributor'

# Change all staff users who are currently the Editor role to have the Author role
gctools change-role <apiURL> <adminAPIKey> --filterRole 'Editor' --newRole 'Author'
```

### add-member-newsletter-subscription

Remove subscriptions for a specific newsletter

```sh
# Remove all subscriptions
gctools add-member-newsletter-subscription <apiURL> <adminAPIKey> <newsletterID>

# Remove all subscriptions for a filtered set of members by label
gctools add-member-newsletter-subscription <apiURL> <adminAPIKey> <newsletterID> --onlyForLabelSlug 'premium'
```


### remove-member-newsletter-subscription

Remove subscriptions for a specific newsletter

```sh
# Remove all subscriptions
gctools remove-member-newsletter-subscription <apiURL> <adminAPIKey> <newsletterID>

# Remove all subscriptions for a filtered set of members by label
gctools remove-member-newsletter-subscription <apiURL> <adminAPIKey> <newsletterID> --onlyForLabelSlug 'premium'
```


## Develop

* `commands` handles the traditional CLI input
* `prompts` handles the interactive CLI input
* `tasks` is the tasks run by both the CLI and interactive tool


# Copyright & License

Copyright (c) 2013-2022 Ghost Foundation - Released under the [MIT license](LICENSE).
